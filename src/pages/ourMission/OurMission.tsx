import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function OurMission() {
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
                    Our Mission
                </Typography>

                <Typography variant="body1" gutterBottom>

                    At PropelX, our mission is simple but profound: to equip every student with the right skills, at the right time, to thrive in a rapidly evolving world. We aim to integrate upskilling into the very DNA of education—where learning is continuous, seamless, and perfectly aligned with real-world demands. We believe that no one should fall behind because the system wasn’t designed for them. That’s why we’re building an ecosystem where students are more than prepared—they’re empowered. We exist to break down barriers between education and opportunity, ensuring that every learner becomes the architect of their own future.

                </Typography>


            </Box>
        </Container>
    );
}
