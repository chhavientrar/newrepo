import { useScroll } from 'framer-motion';

import Box from '@mui/material/Box';

import ScrollProgress from 'src/components/scroll-progress';

import HomeHero from '../home-hero';
import HomeMinimal from '../home-minimal';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />

        {/* <HomeHugePackElements /> */}

        {/* <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeForDesigner />
          <StyledPolygon anchor="bottom" />
        </Box> */}

        {/* <HomeDarkMode />

        <HomeColorPresets />

        <HomeCleanInterfaces />

        <HomePricing />

        <HomeLookingFor />

        <HomeAdvertisement /> */}
      </Box>
    </>
  );
}
