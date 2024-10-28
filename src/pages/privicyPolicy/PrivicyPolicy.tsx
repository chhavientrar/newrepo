import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function PrivacyPolicy() {
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
          Privacy Policy for PropelX
        </Typography>

        <Typography variant="body1" gutterBottom>
          Welcome to PropelX. We are committed to protecting the privacy of our users. This Privacy
          Policy outlines how we collect, use, disclose, and safeguard your information when you
          visit our website.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          At PropelX, we prioritize the privacy of our visitors. This Privacy Policy document
          contains types of information that is collected and recorded by PropelX and how we use it.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" gutterBottom>
          • Personal Information: Includes name, email address, date of birth, educational
          background, and employment history.
          <br />
          • Usage Data: Information on how you interact with our services, including access times,
          pages viewed, and the routes by which you access our services.
          <br />• Technical Data: Includes IP addresses, browser type, device information, and
          cookies.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          • To provide and maintain our service.
          <br />
          • To personalize your experience on our platform.
          <br />
          • To communicate with you, including responding to your inquiries, providing customer
          support, and sending you service-related announcements.
          <br />
          • For marketing purposes, if you have opted-in.
          <br />• To conduct analytics and gather statistical data to improve our services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Sharing and Disclosure
        </Typography>
        <Typography variant="body1" gutterBottom>
          • With educational institutions and employers as part of our services.
          <br />
          • With third-party service providers who perform services on our behalf.
          <br />• To comply with legal obligations or protect our rights in certain circumstances.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Data Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          • We use appropriate technical and organizational measures to protect the data we collect
          against accidental or unlawful destruction, loss, alteration, unauthorized disclosure or
          access.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. International Data Transfers
        </Typography>
        <Typography variant="body1" gutterBottom>
          • Information that we collect may be transferred and processed in countries other than
          your own, including in the United States.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Your Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          • You have the right to access, correct, delete, or transfer your personal data that we
          hold.
          <br />• You have the right to opt-out of marketing communications at any time.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          • We may update this policy from time to time to reflect changes to our practices or for
          other operational, legal, or regulatory reasons.
        </Typography>

        <Typography variant="h5" gutterBottom>
          9. Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          • If you have questions or concerns about this policy or our practices, please contact us
          at help@propelx.club
        </Typography>
      </Box>
    </Container>
  );
}
