import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {




    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        component="img"
        src="https://i.ibb.co/w6RnYHS/propelx-Shortlogo.jpg"
        sx={{ width: 33, height: 33, cursor: 'pointer', borderRadius: "50%", ...sx }}
      />
    );

    // const logo = (
    //   <Box
    //     ref={ref}
    //     component="div"
    //     sx={{
    //       width: 40,
    //       height: 40,
    //       display: 'inline-flex',
    //       ...sx,
    //     }}
    //     {...other}
    //   >
    //     <Avatar
    //       alt="img"
    //       src="https://github-production-user-asset-6210df.s3.amazonaws.com/77965216/366140437-02acd345-4bb5-4d49-8643-eac726582d37.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240910%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240910T170743Z&X-Amz-Expires=300&X-Amz-Signature=8853e146d24bf5c363c9fda5998d3c43a17e7c921fc9ca187cd3a25223ce546a&X-Amz-SignedHeaders=host&actor_id=77965216&key_id=0&repo_id=802590117"
    //     />

    //   </Box>
    // );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
