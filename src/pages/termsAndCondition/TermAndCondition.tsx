import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function TermAndCondition() {
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

        <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
          Terms and Conditions
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" gutterBottom>
          These terms and conditions govern your use of PropelX and are a legal agreement between
          you and us.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Acceptance of Terms
        </Typography>
        <Typography variant="body1" gutterBottom>
          By accessing or using PropelX, you agree to be bound by these terms. If you do not agree,
          do not use our services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          3. Service Provision
        </Typography>
        <Typography variant="body1" gutterBottom>
          • We provide a platform that connects students with educational and career opportunities.
          <br />• We reserve the right to modify or discontinue any service or feature without
          notice.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. User Obligations
        </Typography>
        <Typography variant="body1" gutterBottom>
          • You agree to provide true, accurate, current, and complete information about yourself as
          prompted by our registration forms.
          <br />
          • You agree to maintain the security of your password and identification.
          <br />• You are responsible for all activities that occur under your account.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Intellectual Property Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          • All materials provided on PropelX, including but not limited to information, documents,
          products, logos, graphics, sounds, images, and services, are owned by us or our licensors.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Prohibited Activities
        </Typography>
        <Typography variant="body1" gutterBottom>
          • You are prohibited from using our platform to engage in any illegal, misleading, or
          fraudulent activities.
        </Typography>

        <Typography variant="h5" gutterBottom>
          7. Termination
        </Typography>
        <Typography variant="body1" gutterBottom>
          • We may terminate or suspend your account immediately, without prior notice, if you
          breach these Terms.
        </Typography>

        <Typography variant="h5" gutterBottom>
          8. Limitation of Liability
        </Typography>
        <Typography variant="body1" gutterBottom>
          • PropelX shall not be liable for any indirect, incidental, special, consequential, or
          punitive damages resulting from your use of or inability to use the service.
        </Typography>

        <Typography variant="h5" gutterBottom>
          9. Governing Law
        </Typography>
        <Typography variant="body1" gutterBottom>
          • These terms shall be governed by the laws of the country/state where PropelX is based
          without regard to its conflict of law provisions.
        </Typography>

        <Typography variant="h5" gutterBottom>
          10. Changes to These Terms
        </Typography>
        <Typography variant="body1" gutterBottom>
          • We reserve the right to modify these terms at any time. By continuing to access or use
          our services after those revisions become effective, you agree to be bound by the revised
          terms.
        </Typography>

        <Typography variant="h5" gutterBottom>
          11. Contact Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          • If you have any questions about these terms, please contact us at help@propelx.club
        </Typography>
      </Box>
    </Container>
  );
}
