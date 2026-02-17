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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AttachMoney,
  AccessTime,
  Pending,
  CheckCircle,
  Cancel,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { proposalAPI } from '../../api/proposalAPI';

const FreelancerProposals = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      setError('');
      
      try {
        // Try to fetch user's proposals using the main endpoint
        const response = await proposalAPI.getMyProposals();
        setProposals(response.data || []);
      } catch (err) {
        // If my-proposals fails, try the general endpoint and filter on client side
        console.log('My-proposals endpoint failed, trying fallback:', err.message);
        
        // Check if it's a 400/403/404 error (endpoint doesn't exist or not authorized)
        if (err.response?.status === 400 || err.response?.status === 403 || err.response?.status === 404) {
          console.log('Endpoint not available, attempting fallback...');
          try {
            // Fallback: Try to get all proposals
            const allProposalsResponse = await proposalAPI.getAllProposals();
            const allProposals = allProposalsResponse.data || [];
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            // Filter proposals by current user (this is a client-side filter)
            // The backend should return the user info in proposals
            setProposals(allProposals);
            if (allProposals.length === 0) {
              setError('No proposals found. The endpoint might not be fully configured on the backend.');
            }
          } catch (fallbackErr) {
            console.error('Fallback also failed:', fallbackErr);
            setError(`Unable to load proposals. Backend error: ${fallbackErr.response?.data?.message || fallbackErr.message}`);
            setProposals([]);
          }
        } else {
          // Different error type
          setError(err.response?.data?.message || `Failed to load proposals: ${err.message}`);
          setProposals([]);
        }
      }
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setError('An unexpected error occurred. Please try again.');
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (proposalId) => {
    try {
      setActionLoading(proposalId);
      await proposalAPI.withdrawProposal(proposalId);
      setSuccessMessage('Proposal withdrawn successfully!');
      setConfirmDialogOpen(false);
      fetchProposals();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to withdraw proposal');
    } finally {
      setActionLoading(null);
    }
  };

  const openConfirmDialog = (proposal) => {
    setSelectedProposal(proposal);
    setConfirmDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'success';
      case 'REJECTED':
        return 'error';
      case 'WITHDRAWN':
        return 'default';
      default:
        return 'warning'; // PENDING
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return <CheckCircle sx={{ mr: 1, color: 'green' }} />;
      case 'REJECTED':
        return <Cancel sx={{ mr: 1, color: 'red' }} />;
      case 'PENDING':
        return <Pending sx={{ mr: 1, color: 'orange' }} />;
      default:
        return <AccessTime sx={{ mr: 1 }} />;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading your proposals...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Proposals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage all your job proposals
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {proposals.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No proposals yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Start by browsing available jobs and submitting proposals
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs')}
          >
            Browse Jobs
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {proposals.map((proposal) => (
            <Grid item xs={12} key={proposal.id}>
              <Card sx={{ 
                boxShadow: 2, 
                '&:hover': { boxShadow: 4 },
                transition: 'all 0.3s ease'
              }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="flex-start">
                    {/* Left Section - Job Details */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {proposal.jobTitle || 'Job Proposal'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {proposal.jobDescription || 'No description available'}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip
                          icon={getStatusIcon(proposal.status)}
                          label={proposal.status || 'PENDING'}
                          color={getStatusColor(proposal.status)}
                          variant="outlined"
                        />
                      </Box>

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Your Cover Letter:</strong>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {proposal.coverLetter}
                      </Typography>
                    </Grid>

                    {/* Right Section - Proposal Details & Actions */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <AttachMoney sx={{ mr: 1, color: 'success.main' }} />
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Proposed Price
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  ${proposal.proposedPrice || 'N/A'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <AccessTime sx={{ mr: 1, color: 'info.main' }} />
                              <Box>
                                <Typography variant="caption" color="text.secondary">
                                  Timeline
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  {proposal.estimatedDays || 'N/A'} days
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                              Submitted On
                            </Typography>
                            <Typography variant="body2">
                              {proposal.submittedDate 
                                ? new Date(proposal.submittedDate).toLocaleDateString()
                                : 'N/A'
                              }
                            </Typography>
                          </Grid>

                          {proposal.status?.toUpperCase() === 'ACCEPTED' && (
                            <Grid item xs={12}>
                              <Alert severity="success" sx={{ mt: 1 }}>
                                This proposal has been accepted! 🎉
                              </Alert>
                            </Grid>
                          )}

                          {proposal.status?.toUpperCase() === 'REJECTED' && (
                            <Grid item xs={12}>
                              <Alert severity="error" sx={{ mt: 1 }}>
                                This proposal was rejected
                              </Alert>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>

                      {/* Action Buttons */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => navigate(`/proposals/${proposal.id}`)}
                        >
                          View Details
                        </Button>
                        {proposal.status?.toUpperCase() === 'PENDING' && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            disabled={actionLoading === proposal.id}
                            onClick={() => openConfirmDialog(proposal)}
                          >
                            {actionLoading === proposal.id ? 'Withdrawing...' : 'Withdraw'}
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to withdraw this proposal? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => handleWithdraw(selectedProposal?.id)}
            color="error"
            disabled={actionLoading === selectedProposal?.id}
          >
            {actionLoading === selectedProposal?.id ? 'Processing...' : 'Withdraw'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FreelancerProposals;
