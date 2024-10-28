import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function OurVision() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <Container>
            <Box sx={{ mt: 5 }}>
                <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mb: 3 }}>
                    Back
                </Button>

                <Typography variant="h4" gutterBottom>
                    Our Vision
                </Typography>

                <Typography variant="body1" gutterBottom>



                    We envision a future where the workforce is no longer shaped by outdated systems but by the limitless potential of every individual. At PropelX, we are creating a world where every student is empowered to realize their full potential, armed with the skills, knowledge, and confidence to lead. Our vision is not to just bridge the gap between education and employment but to eliminate it entirely. We dream of a future where every student is equipped with cutting-edge skills that match tomorrow’s industries, where the transition from learning to doing is so fluid that success becomes inevitable. With PropelX, we don’t just foresee the future; we’re building it.


                </Typography>


            </Box>
        </Container>
    );
}
