import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { usePathname } from 'src/routes/hooks';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const homePage = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> made by
          <Link href=""> Propelx </Link>
        </Typography>
        <Typography variant="caption" component="div">
          <Link href="/privicy-policy"> Privicy Policy </Link>
        </Typography>
        <Typography variant="caption" component="div">
          <Link href="/term-and-condition"> Term & Conditions </Link>
        </Typography>
      </Container>
    </Box>
  );


  return homePage ? simpleFooter : simpleFooter;
}
