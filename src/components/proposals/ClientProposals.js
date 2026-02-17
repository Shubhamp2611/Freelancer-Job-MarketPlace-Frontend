/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Alert,
  CircularProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { 
  Person, 
  AttachMoney, 
  AccessTime, 
  CheckCircle, 
  Cancel,
  Message,
  Work
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { proposalAPI } from '../../api/proposalAPI';

const ClientProposals = ({ jobId }) => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (jobId) {
      fetchProposals();
    }
  }, [jobId]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await proposalAPI.getProposalsForJob(jobId);
      setProposals(response.data || []);
    } catch (err) {
      if (err.response?.status === 400) {
        setError('You can only view proposals for your own jobs');
      } else {
        setError('Failed to fetch proposals');
      }
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!selectedProposal || !message.trim()) {
      alert('Please enter a message for the freelancer');
      return;
    }

    try {
      setActionLoading('accept');
      await proposalAPI.acceptProposal(selectedProposal.id, message);
      alert('Proposal accepted successfully! A contract has been created.');
      setAcceptDialogOpen(false);
      setMessage('');
      fetchProposals(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept proposal');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!selectedProposal || !message.trim()) {
      alert('Please enter a reason for rejection');
      return;
    }

    try {
      setActionLoading('reject');
      await proposalAPI.rejectProposal(selectedProposal.id, message);
      alert('Proposal rejected.');
      setRejectDialogOpen(false);
      setMessage('');
      fetchProposals(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject proposal');
    } finally {
      setActionLoading(null);
    }
  };

  const openAcceptDialog = (proposal) => {
    setSelectedProposal(proposal);
    setMessage(`Congratulations! Your proposal has been accepted for the job "${proposal.jobTitle}". We look forward to working with you.`);
    setAcceptDialogOpen(true);
  };

  const openRejectDialog = (proposal) => {
    setSelectedProposal(proposal);
    setMessage(`Thank you for your proposal. Unfortunately, we have decided to go with another candidate for this project.`);
    setRejectDialogOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <CircularProgress />
        <Typography>Loading proposals...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (proposals.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Work sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No proposals yet
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Proposals will appear here when freelancers apply to your job.
          Share your job link to attract more freelancers.
        </Typography>
      </Paper>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Proposals ({proposals.length})
        </Typography>
        <Chip 
          label="Job Open" 
          color="success" 
          variant="outlined"
        />
      </Box>
      
      <Grid container spacing={3}>
        {proposals.map((proposal) => (
          <Grid item xs={12} key={proposal.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Person sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6">{proposal.freelancerName}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {proposal.freelancerEmail}
                    </Typography>
                    {proposal.freelancerRating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <Chip 
                          label={`${proposal.freelancerRating} ★`} 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                          {proposal.freelancerCompletedJobs || 0} jobs completed
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ textAlign: 'right' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'flex-end' }}>
                      <Chip 
                        label={`$${proposal.proposedPrice}`} 
                        color="primary" 
                        icon={<AttachMoney />}
                        size="small"
                      />
                      <Chip 
                        label={`${proposal.estimatedDays} days`}
                        variant="outlined"
                        icon={<AccessTime />}
                        size="small"
                      />
                    </Box>
                    <Chip 
                      label={proposal.status} 
                      color={
                        proposal.status === 'PENDING' ? 'default' :
                        proposal.status === 'ACCEPTED' ? 'success' :
                        proposal.status === 'REJECTED' ? 'error' : 'default'
                      }
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
                
                <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Cover Letter
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {proposal.coverLetter}
                  </Typography>
                </Paper>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Submitted: {new Date(proposal.submittedAt).toLocaleDateString()} at {new Date(proposal.submittedAt).toLocaleTimeString()}
                  </Typography>
                  
                  {proposal.status === 'PENDING' && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={() => openAcceptDialog(proposal)}
                        disabled={actionLoading}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={() => openRejectDialog(proposal)}
                        disabled={actionLoading}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                  
                  {proposal.status === 'ACCEPTED' && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Message />}
                    >
                      View Contract
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Accept Dialog */}
      <Dialog open={acceptDialogOpen} onClose={() => setAcceptDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Accept Proposal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You are about to accept the proposal from <strong>{selectedProposal?.freelancerName}</strong>.
            A contract will be created automatically.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Message to Freelancer"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAcceptDialogOpen(false)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAccept}
            disabled={actionLoading || !message.trim()}
          >
            {actionLoading === 'accept' ? <CircularProgress size={24} /> : 'Accept Proposal'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Proposal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You are about to reject the proposal from <strong>{selectedProposal?.freelancerName}</strong>.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason for Rejection"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialogOpen(false)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={handleReject}
            disabled={actionLoading || !message.trim()}
          >
            {actionLoading === 'reject' ? <CircularProgress size={24} /> : 'Reject Proposal'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientProposals;