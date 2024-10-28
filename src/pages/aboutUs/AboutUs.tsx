import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AboutUs() {
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
                    About Us
                </Typography>

                <Typography variant="body1" gutterBottom>
                    At PropelX, we are reimagining the future of education and employment. We’re not just building a platform—we’re creating a revolution, where the gap between academia and the professional world disappears. Every student is a visionary waiting to unleash their potential, and we’re here to ensure they do exactly that. We believe that every skill learned, every challenge faced, is a stepping stone toward a future where students don’t just survive—they thrive, becoming the innovators, leaders, and creators of tomorrow’s world. By harnessing the power of data, cutting-edge technology, and human insight, PropelX is reshaping the way students prepare for their careers. We’re not just offering a service; we’re crafting a movement that enables students to not only be job-ready but to shape the industries they enter.


                </Typography>


            </Box>
        </Container>
    );
}
