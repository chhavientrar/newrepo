import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import FormProvider from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClassicLoginView() {

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(`/auth/login`, data, {});

      localStorage.setItem('auth-token', response?.data.token);
      localStorage.setItem('userType', response?.data?.userType)

      // toast.success('Loged In SucessFully', {
      //   position: 'bottom-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });

      // setIsSubmitting(false);
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      //   setIsSubmitting(false);
      //   toast.error(error.response.data.Msg, {
      //     position: 'bottom-right',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // } else {
      //   setIsSubmitting(false);
      //   toast.error('Something went wrong', {
      //     position: 'bottom-right',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });
      // }
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Minimal</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.authDemo.classic.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {/* {renderForm} */}
    </FormProvider>
  );
}
