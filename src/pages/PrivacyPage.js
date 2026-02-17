import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const PrivacyPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Privacy Policy
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body2">
              We collect information you provide directly to us, such as when you create an account
              or post a job. This includes your name, email, phone number, and payment information.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              We use your information to:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Provide and improve our services" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Process payments and transactions" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Send you updates and marketing communications" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Prevent fraud and enforce our terms" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Comply with legal obligations" />
              </ListItem>
            </List>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              3. Data Security
            </Typography>
            <Typography variant="body2">
              We implement industry-standard security measures to protect your personal information.
              However, no method of transmission over the internet is completely secure.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              4. Third-Party Services
            </Typography>
            <Typography variant="body2">
              We may share your information with third-party service providers, including payment
              processors and analytics services. These providers are contractually obligated to
              maintain your information's confidentiality.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              5. User Rights
            </Typography>
            <Typography variant="body2">
              You have the right to access, modify, or delete your personal information. Contact
              us to exercise these rights.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              6. Cookies
            </Typography>
            <Typography variant="body2">
              We use cookies to improve your experience on our platform. You can control cookie
              settings through your browser.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              7. Changes to Privacy Policy
            </Typography>
            <Typography variant="body2">
              We may update this privacy policy from time to time. We will notify you of any changes
              by posting the new policy on this page.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              8. Contact Us
            </Typography>
            <Typography variant="body2">
              If you have questions about this privacy policy, please contact us at
              privacy@freelancingmarketplace.com
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary' }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPage;
