import React, { useState } from 'react';
import {
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Search as SearchIcon } from '@mui/icons-material';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the Register button on the login page. Fill in your details and choose your role (Client or Freelancer). Verify your email to activate your account.',
        },
        {
          q: 'What is the difference between Client and Freelancer roles?',
          a: 'Clients post jobs and hire freelancers to complete them. Freelancers browse available jobs and submit proposals to work on them.',
        },
        {
          q: 'How do I reset my password?',
          a: 'Click on "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your email.',
        },
      ],
    },
    {
      category: 'Job Management',
      questions: [
        {
          q: 'How do I post a job as a client?',
          a: 'Navigate to Job > Create Job. Fill in the job details, set your budget, and submit. Your job will be visible to freelancers immediately.',
        },
        {
          q: 'Can I edit a job after posting?',
          a: 'Yes, you can edit job details until you accept proposals. Once a proposal is accepted, further edits are limited.',
        },
        {
          q: 'How do I search for jobs as a freelancer?',
          a: 'Go to the Jobs page and use the search and filter options to find relevant jobs. You can filter by category, budget, and skill requirements.',
        },
      ],
    },
    {
      category: 'Proposals & Contracts',
      questions: [
        {
          q: 'How do I submit a proposal?',
          a: 'Find a job you\'re interested in and click "Submit Proposal". Provide your bid amount, timeline, and a cover letter.',
        },
        {
          q: 'Can I submit multiple proposals for the same job?',
          a: 'Yes, you can submit multiple proposals, but each proposal should be tailored to the job requirements.',
        },
        {
          q: 'How are contracts created?',
          a: 'Once a client accepts your proposal, a contract is automatically created. Both parties review and accept the contract terms.',
        },
      ],
    },
    {
      category: 'Payments & Escrow',
      questions: [
        {
          q: 'How does the escrow system work?',
          a: 'When a contract starts, the client funds the job amount to escrow. The freelancer receives payment after completing milestones.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit cards, debit cards, and bank transfers. Payments are processed securely through our payment gateway.',
        },
        {
          q: 'What is the fee structure?',
          a: 'We charge a 5% service fee on successful job completion. This helps us maintain the platform and provide support.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          q: 'How do I verify my identity?',
          a: 'Go to Settings > Verification. Upload a government-issued ID and wait for our team to verify it.',
        },
        {
          q: 'Is my personal information safe?',
          a: 'Yes, we use industry-standard encryption and security measures to protect your data.',
        },
        {
          q: 'How do I enable two-factor authentication?',
          a: 'Go to Settings > Security. Enable Two-Factor Authentication and follow the setup instructions.',
        },
      ],
    },
  ];

  const filteredFaqs = faqs
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        item =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(category => category.questions.length > 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Help & FAQ
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Find answers to common questions about our platform.
      </Typography>

      <TextField
        placeholder="Search FAQs..."
        variant="outlined"
        fullWidth
        sx={{ mb: 4 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, idx) => (
            <Box key={idx}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {category.category}
              </Typography>
              {category.questions.map((item, qIdx) => (
                <Accordion key={qIdx} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{item.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{item.a}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography>No FAQs found. Try a different search term.</Typography>
          </Paper>
        )}
      </Box>

      <Paper sx={{ p: 3, mt: 4, backgroundColor: 'info.light' }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Still need help?
        </Typography>
        <Typography variant="body2">
          Contact our support team at support@freelancingmarketplace.com or use the chat widget.
        </Typography>
      </Paper>
    </Container>
  );
};

export default HelpPage;
