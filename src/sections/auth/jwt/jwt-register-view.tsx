import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    studentId: Yup.string().required('Student ID is required'),
    phone: Yup.string().required('Phone number is required'),
    type: Yup.string().required('User type is required'),
    wantToBe: Yup.string().required('Want to be redirected')
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    studentId: '',
    phone: '91', // Default value with "+91"
    type: 'student',
    wantToBe: ''
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        '/auth/register',
        {
          name: data.name,
          email: data.email,
          password: data.password,
          studentId: data.studentId,
          phone: data.phone,
          type: data.type,
          wantToBe: data.wantToBe
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);
      router.push(returnTo || '/');
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(error.response?.data?.message || error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 1, position: 'relative' }}>
      <Typography variant="h4">Get started with PropelX</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="email" label="Email address" />
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField name="studentId" label="Student ID" />

      {/* Phone Number field with default +91 */}
      <RHFTextField
        name="phone"
        label="Phone Number"
        onFocus={(e) => {
          if (!e.target.value.startsWith('+91')) {
            e.target.value = `+91${e.target.value}`;
          }
        }}
      />

      <RHFSelect name="type" label="User Type">
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="trainer">Trainer</MenuItem>
      </RHFSelect>
      <RHFTextField name="wantToBe" label="Want To Be" />

      <LoadingButton fullWidth color="inherit" size="large" type="submit" variant="contained" loading={isSubmitting}>
        Create account
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
