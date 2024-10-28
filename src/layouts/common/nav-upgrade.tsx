// Correct import for Avatar
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// Importing Button component

// import { useMockedUser } from 'src/hooks/use-mocked-user';

// ----------------------------------------------------------------------

export default function NavUpgrade() {
  // const { user } = useMockedUser();
  // const profilePic = localStorage.getItem('profilePic') || ''; // Provide a default value
  // const userName = localStorage.getItem('') || 'Guest'; // Provide a default value
  // const email = localStorage.getItem('email') || ''; // Provide a default value

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        {/* <Box sx={{ position: 'relative' }}>
          <Avatar src={profilePic} alt={user?.displayName} sx={{ width: 48, height: 48 }}>
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>
        </Box> */}
        {/* 
        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {email}
          </Typography>
        </Stack> */}

        {/* Add the "Create Resume" button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }} // Adds margin-top for spacing
          onClick={() => console.log('Create Resume button clicked!')}
        >
          Create Resume
        </Button>

      </Stack>
    </Stack>
  );
}
