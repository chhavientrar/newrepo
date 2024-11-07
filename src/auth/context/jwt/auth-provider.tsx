/* eslint-disable no-nested-ternary */
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios from 'src/utils/axios';

import { setSession } from './utils';
import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType | null;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        loading: false,
        user: action.payload.user,
      };
    case Types.LOGIN:
    case Types.REGISTER:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const STORAGE_KEY = 'auth-token';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      console.log(accessToken, 'accessTokenDebugger');

      if (accessToken) {
        setSession(accessToken); // Set token for axios requests

        const res = await axios.get('/users/me', {
          headers: {
            'auth-token': `${window.localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
        });

        const { user } = res.data;

        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('profilePic', res.data.profileImageUrl);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const res = await axios.post('/auth/login', data);

    const accessToken = res?.data?.token;
    console.log(accessToken, "accesstoken");
    localStorage.setItem(STORAGE_KEY, accessToken);
    // localStorage.setItem('auth-token', response?.data.token);
    localStorage.setItem('userType', res?.data?.userType)

    setSession(accessToken);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          // ...user,
          accessToken,
        },
      },
    });
  }, []);

  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const data = { email, password, firstName, lastName };
      const res = await axios.post('/auth/register', data);

      const { accessToken, user } = res.data;
      setSession(accessToken);
      sessionStorage.setItem(STORAGE_KEY, accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    []
  );

  const logout = useCallback(async () => {
    setSession(null);
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const status = state.loading ? 'loading' : state.user ? 'authenticated' : 'unauthenticated';

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
