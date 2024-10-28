/* eslint-disable no-unneeded-ternary */
// ----------------------------------------------------------------------

export function localStorageAvailable() {
  try {
    const key = 'auth-tokecxn';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);

    return true;
  } catch (error) {
    return false;
  }
}

// export const localStorageAvailable = () =>
//   window.localStorage.getItem('auth-token') ? true : false;

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  let value;

  if (storageAvailable) {
    value = localStorage.getItem(key) || defaultValue;
  }

  return value;
}
