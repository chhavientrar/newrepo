import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Avatar, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Avatar
      alt="Profile"
      src="https://i.ibb.co/w6RnYHS/propelx-Shortlogo.jpg"
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          maxWidth: {
            xs: 380,
            lg: 460,
            xl: 620,
          },
        }}
      />

      {/* Add the links here */}
      <Stack direction="column" spacing={1} alignItems="center">
        <Typography sx={{ color: "#0e8562", fontSize: "15px" }} component="div">
          <Link to="/about-us-page" style={{ color: "#0e8562" }}>About Us</Link> |
          <Link to="/our-mission" style={{ color: "#0e8562" }}> Mission</Link> |
          <Link to="/our-vision" style={{ color: "#0e8562" }}> Vision</Link>
        </Typography>
        {/* <Typography sx={{ color: "white" }} variant="caption" component="div">
          <Link to="/our-mission" style={{ color: "white" }}>Mission</Link>
        </Typography>
        <Typography sx={{ color: "white" }} variant="caption" component="div">
          <Link to="/our-vision" style={{ color: "white" }}>Vision</Link>
        </Typography> */}
      </Stack>
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}
