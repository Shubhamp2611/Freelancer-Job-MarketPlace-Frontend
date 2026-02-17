/* eslint-disable no-unused-vars */
// src/components/common/Footer.js
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
  Stack,
  Tooltip,
  Chip,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
  Instagram,
  Work,
  Email,
  Phone,
  LocationOn,
  Code,
  School,
  Security,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Clients',
      links: [
        { text: 'How to Hire', to: '/how-to-hire' },
        { text: 'Post a Job', to: '/jobs/create' },
        { text: 'Find Freelancers', to: '/freelancers' },
        { text: 'Success Stories', to: '/success-stories' },
      ],
    },
    {
      title: 'For Freelancers',
      links: [
        { text: 'How to Find Work', to: '/how-to-find-work' },
        { text: 'Browse Jobs', to: '/jobs' },
        { text: 'Freelancer Guide', to: '/guide/freelancer' },
        { text: 'Earnings', to: '/earnings' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Help Center', to: '/help' },
        { text: 'Community', to: '/community' },
        { text: 'Blog', to: '/blog' },
        { text: 'FAQs', to: '/faqs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', to: '/about' },
        { text: 'Contact', to: '/contact' },
        { text: 'Privacy Policy', to: '/privacy' },
        { text: 'Terms of Service', to: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { 
      icon: <Facebook />, 
      url: 'https://facebook.com', 
      label: 'Facebook',
      description: 'Follow us on Facebook'
    },
    { 
      icon: <Twitter />, 
      url: 'https://twitter.com', 
      label: 'Twitter',
      description: 'Follow us on Twitter'
    },
    { 
      icon: <LinkedIn />, 
      url: 'https://linkedin.com', 
      label: 'LinkedIn',
      description: 'Connect on LinkedIn'
    },
    { 
      icon: <GitHub />, 
      url: 'https://github.com/yourusername/freelance-marketplace', 
      label: 'GitHub',
      description: 'View source code'
    },
    { 
      icon: <Instagram />, 
      url: 'https://instagram.com', 
      label: 'Instagram',
      description: 'Follow us on Instagram'
    },
  ];

  const contactInfo = [
    { 
      icon: <Email />, 
      label: 'Email Support', 
      value: 'support@freelancehub.com',
      href: 'mailto:support@freelancehub.com'
    },
    { 
      icon: <Phone />, 
      label: 'Phone', 
      value: '+1 (888) 123-4567',
      href: 'tel:+18881234567'
    },
    { 
      icon: <LocationOn />, 
      label: 'Location', 
      value: 'San Francisco, CA'
    },
    { 
      icon: <School />, 
      label: 'Developer', 
      value: 'Your Name/Team Name'
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.8)
          : '#1a1a1a',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 'auto',
        borderTop: theme.palette.mode === 'dark' 
          ? `1px solid ${theme.palette.divider}`
          : 'none',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Work sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                FreelanceHub
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ color: '#999', mb: 3, maxWidth: 300 }}>
              Connecting talented freelancers with amazing clients worldwide. 
              Your success is our mission.
            </Typography>
            
            {/* Tech Stack */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" fontWeight="bold" color="#999" display="block" gutterBottom>
                Built With:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip 
                  label="React" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
                <Chip 
                  label="Spring Boot" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
                <Chip 
                  label="Material-UI" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
                <Chip 
                  label="MySQL" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
                <Chip 
                  label="Redux" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
                <Chip 
                  label="JWT" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: '#999',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' }
                  }} 
                />
              </Box>
            </Box>

            {/* Social Links */}
            <Stack direction="row" spacing={1}>
              {socialLinks.map((social) => (
                <Tooltip key={social.label} title={social.description} arrow>
                  <IconButton
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Grid>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} md={2} key={section.title}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link) => (
                  <MuiLink
                    key={link.text}
                    component={Link}
                    to={link.to}
                    sx={{
                      color: '#999',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.text}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((contact, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    color: 'primary.main', 
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 24
                  }}>
                    {contact.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                      {contact.label}
                    </Typography>
                    {contact.href ? (
                      <MuiLink
                        href={contact.href}
                        sx={{ 
                          color: 'white', 
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          '&:hover': { color: 'primary.main' }
                        }}
                      >
                        {contact.value}
                      </MuiLink>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'white', fontSize: '0.875rem' }}>
                        {contact.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Platform Status */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <Typography variant="caption" fontWeight="bold" color="primary" display="block" gutterBottom>
                Platform Status
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                24/7 Online • Secure • Reliable
              </Typography>
              <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1, fontStyle: 'italic' }}>
                Version 1.0.0
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        {/* Bottom Bar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: 2,
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#999' }}>
              © {currentYear} FreelanceHub. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 0.5 }}>
              Developed with ❤️ by Your Name/Team Name
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <MuiLink
              component={Link}
              to="/privacy"
              sx={{ color: '#999', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Privacy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              sx={{ color: '#999', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Terms
            </MuiLink>
            <MuiLink
              component={Link}
              to="/cookies"
              sx={{ color: '#999', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Cookies
            </MuiLink>
            <MuiLink
              component={Link}
              to="/security"
              sx={{ color: '#999', textDecoration: 'none', fontSize: '0.875rem' }}
            >
              Security
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;