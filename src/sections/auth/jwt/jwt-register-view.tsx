import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Import axios

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment'; // Import for dropdown

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form'; // RHFSelect for the dropdown

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();

  // Validation schema to include only 'name' instead of 'firstName' and 'lastName'
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'), // Updated to single name field
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    studentId: Yup.string().required('Student ID is required'), // New field
    phoneNo: Yup.string().required('Phone number is required'), // New field
    type: Yup.string().required('User type is required'), // New field
  });

  // Default values including the updated 'name' field
  const defaultValues = {
    name: '', // Updated to single name field
    email: '',
    password: '',
    studentId: '', // New field
    phoneNo: '', // New field
    type: 'student', // Default to student
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
      // API Call to the signup endpoint
      const response = await axios.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        studentId: data.studentId,
        phoneNo: data.phoneNo,
        type: data.type,
      }, {
        headers: {
          'Content-Type': 'application/json' // Correct Content-Type header
        }
      });
      console.log(response);

      router.push(returnTo || '/'); // Closing the axios.post method properly
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(error.response?.data?.message || error.message); // More informative error message
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
      {/* Single 'name' field */}
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

      {/* New fields */}
      <RHFTextField name="studentId" label="Student ID" />
      <RHFTextField name="phoneNo" label="Phone Number" />

      {/* Dropdown for user type */}
      <RHFSelect name="type" label="User Type">
        <MenuItem value="student">Student</MenuItem>
        <MenuItem value="trainer">Trainer</MenuItem>
      </RHFSelect>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
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
