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

const TermsPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Terms of Service
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body2">
              By accessing and using this freelancing marketplace, you accept and agree to be bound
              by the terms and provision of this agreement.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              2. User Accounts
            </Typography>
            <Typography variant="body2">
              You are responsible for maintaining the confidentiality of your account and password
              and for restricting access to your computer. You agree to accept responsibility for
              all activities that occur under your account or password.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              3. User Conduct
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              You agree not to use this platform to:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Post illegal or inappropriate content" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Harass, defame, or harm others" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Engage in fraud or deception" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Violate intellectual property rights" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Spam or send unsolicited messages" />
              </ListItem>
            </List>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              4. Payments and Escrow
            </Typography>
            <Typography variant="body2">
              The escrow system is designed to protect both clients and freelancers. Funds are
              released according to the contract terms and project milestones. We charge a service
              fee for this protection.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              5. Intellectual Property
            </Typography>
            <Typography variant="body2">
              You retain ownership of your content. However, by posting on our platform, you grant
              us a license to use your content as necessary to operate the platform.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              6. Limitation of Liability
            </Typography>
            <Typography variant="body2">
              To the fullest extent permitted by law, we shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              7. Dispute Resolution
            </Typography>
            <Typography variant="body2">
              any disputes arising from this agreement shall be resolved through our dispute
              resolution process. If not resolved, disputes may be taken to arbitration or court.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              8. Changes to Terms
            </Typography>
            <Typography variant="body2">
              We reserve the right to modify these terms at any time. Your continued use of the
              platform following the posting of revised terms means you accept those changes.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              9. Contact Us
            </Typography>
            <Typography variant="body2">
              If you have any questions about these Terms, please contact us at
              legal@freelancingmarketplace.com
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

export default TermsPage;
