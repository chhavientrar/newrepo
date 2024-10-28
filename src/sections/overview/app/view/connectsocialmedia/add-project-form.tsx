import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect, useCallback } from 'react';

import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { _tags } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import { IPostItem } from 'src/types/blog';

type Props = {
  currentPost?: IPostItem;
  handleClose: any;
};

// Define the type for the cover image
// type CoverImageType = File & { preview: string };

export default function AddProjectForm({ currentPost, handleClose }: Props) {
  // const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  // const preview = useBoolean();

  const initialValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      url: currentPost?.url || '',
      cover_image: currentPost?.cover_image || null,
      tools_n_tech: currentPost?.tools_n_tech || [],
    }),
    [currentPost]
  );

  const methods = useForm({
    // resolver: yupResolver(NewProjectSchema),
    defaultValues: initialValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(initialValues);
    }
  }, [currentPost, initialValues, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const payload = {
      project: values,
    };
    try {
      const response = await axios.post('/users/projects', payload, {
        headers: {
          'auth-token': window.localStorage.getItem('auth-token'),
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update project');
      }
      // getUserDetails(); // Uncomment if you have a function to get user details
      handleClose(); // Uncomment if you have a function to handle dialog close
      reset();
      // preview.onFalse();
      enqueueSnackbar(currentPost ? 'Update success!' : 'Create success!');
      // router.push('/dashboard/posts'); // Adjust the path if needed
    } catch (error) {
      console.error('Error updating project:', error);
    }
  });

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('cover_image', newFile as CoverImageType, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  const handleRemoveFile = useCallback(() => {
    setValue('cover_image', null);
  }, [setValue]);

  const renderDetails = (
    <Grid xs={12} md={12} lg={12}>
      <>
        {!mdUp && <CardHeader title="Details" />}

        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFTextField name="title" label="Project Title" />

          <RHFTextField name="description" label="Description" multiline rows={3} />

          <RHFTextField name="url" label="URL" />

          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Cover</Typography>
            <RHFUpload
              name="cover_image"
              maxSize={3145728}
              // onDrop={handleDrop}
              onDelete={handleRemoveFile}
            />
          </Stack>

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFAutocomplete
              name="tools_n_tech"
              label="Tools & Technologies"
              placeholder="+ Tech Stacks"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />
          </Stack>
        </Stack>
      </>
    </Grid>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Create Project' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}
