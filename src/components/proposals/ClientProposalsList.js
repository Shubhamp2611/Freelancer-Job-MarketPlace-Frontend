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
  TextField,
} from '@mui/material';
import {
  AttachMoney,
  AccessTime,
  CheckCircle,
  Cancel,
  Visibility,
  Person,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../../api/jobAPI';
import { proposalAPI } from '../../api/proposalAPI';

const ClientProposalsList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchClientJobs();
  }, []);

  const fetchClientJobs = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try to get my jobs first
      try {
        const response = await jobAPI.getMyJobs();
        setJobs(response.data || []);
        fetchProposalsForJobs(response.data || []);
      } catch (err) {
        // Fallback to get all jobs
        console.log('My-jobs endpoint failed, trying all jobs:', err.message);
        const response = await jobAPI.getAllJobs();
        setJobs(response.data || []);
        fetchProposalsForJobs(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.response?.data?.message || 'Failed to load your job postings. Please check your connection.');
      setLoading(false);
    }
  };

  const fetchProposalsForJobs = async (jobsList) => {
    const proposalsMap = {};
    
    for (const job of jobsList) {
      try {
        const response = await proposalAPI.getProposalsForJob(job.id);
        proposalsMap[job.id] = response.data || [];
      } catch (err) {
        console.log(`Could not fetch proposals for job ${job.id}:`, err.message);
        proposalsMap[job.id] = [];
      }
    }
    
    setProposals(proposalsMap);
    setLoading(false);
  };

  const handleProposalAction = async () => {
    if (!selectedProposal) return;

    try {
      setActionLoading(selectedProposal.id);
      
      if (actionType === 'accept') {
        await proposalAPI.acceptProposal(selectedProposal.id, actionMessage);
        setSuccessMessage('Proposal accepted! You can now create a contract.');
      } else if (actionType === 'reject') {
        await proposalAPI.rejectProposal(selectedProposal.id, actionMessage);
        setSuccessMessage('Proposal rejected.');
      }
      
      setActionDialogOpen(false);
      fetchClientJobs(); // Refresh proposals
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${actionType} proposal`);
    } finally {
      setActionLoading(null);
    }
  };

  const openActionDialog = (proposal, type) => {
    setSelectedProposal(proposal);
    setActionType(type);
    
    if (type === 'accept') {
      setActionMessage(`Congratulations! Your proposal has been accepted. We look forward to working with you.`);
    } else {
      setActionMessage(`Thank you for your proposal. Unfortunately, we have decided to go with another candidate.`);
    }
    
    setActionDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return 'success';
      case 'REJECTED':
        return 'error';
      default:
        return 'warning';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading proposals for your jobs...
        </Typography>
      </Container>
    );
  }

  const totalProposals = Object.values(proposals).reduce((sum, p) => sum + p.length, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Job Proposals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage proposals received for your job postings ({totalProposals} total)
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

      {jobs.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No job postings yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Post a job to start receiving proposals from freelancers
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs/create')}
          >
            Post a Job
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {jobs.map((job) => {
            const jobProposals = proposals[job.id] || [];
            
            return (
              <Grid item xs={12} key={job.id}>
                <Paper sx={{ p: 3, backgroundColor: '#fafafa' }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={`${jobProposals.length} Proposals`}
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  {jobProposals.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      No proposals yet. Freelancers will start submitting proposals soon.
                    </Typography>
                  ) : (
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                      {jobProposals.map((proposal) => (
                        <Grid item xs={12} key={proposal.id}>
                          <Card sx={{ background: 'white' }}>
                            <CardContent>
                              <Grid container spacing={2} alignItems="flex-start">
                                {/* Freelancer Info */}
                                <Grid item xs={12} md={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Person sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                        {proposal.freelancerName || 'Freelancer'}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        Rating: {proposal.freelancerRating || 'N/A'}⭐
                                      </Typography>
                                    </Box>
                                  </Box>

                                  <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                      Cover Letter:
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {proposal.coverLetter}
                                    </Typography>
                                  </Box>
                                </Grid>

                                {/* Proposal Details */}
                                <Grid item xs={12} md={6}>
                                  <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                        <Box>
                                          <Typography variant="caption" color="text.secondary">
                                            Proposed Price
                                          </Typography>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AttachMoney sx={{ fontSize: 20, color: 'success.main' }} />
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                              {proposal.proposedPrice}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>

                                      <Grid item xs={6}>
                                        <Box>
                                          <Typography variant="caption" color="text.secondary">
                                            Timeline
                                          </Typography>
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTime sx={{ fontSize: 20, color: 'info.main', mr: 0.5 }} />
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                              {proposal.estimatedDays}d
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>

                                      <Grid item xs={12}>
                                        <Typography variant="caption" color="text.secondary">
                                          Status
                                        </Typography>
                                        <Box>
                                          <Chip
                                            label={proposal.status || 'PENDING'}
                                            color={getStatusColor(proposal.status)}
                                            size="small"
                                          />
                                        </Box>
                                      </Grid>

                                      {proposal.submittedDate && (
                                        <Grid item xs={12}>
                                          <Typography variant="caption" color="text.secondary">
                                            Submitted: {new Date(proposal.submittedDate).toLocaleDateString()}
                                          </Typography>
                                        </Grid>
                                      )}
                                    </Grid>
                                  </Paper>

                                  {/* Action Buttons */}
                                  <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<Visibility />}
                                      onClick={() => navigate(`/proposals/${proposal.id}`)}
                                    >
                                      View
                                    </Button>

                                    {proposal.status?.toUpperCase() === 'PENDING' && (
                                      <>
                                        <Button
                                          variant="contained"
                                          color="success"
                                          size="small"
                                          startIcon={<CheckCircle />}
                                          disabled={actionLoading === proposal.id}
                                          onClick={() => openActionDialog(proposal, 'accept')}
                                        >
                                          Accept
                                        </Button>
                                        <Button
                                          variant="outlined"
                                          color="error"
                                          size="small"
                                          startIcon={<Cancel />}
                                          disabled={actionLoading === proposal.id}
                                          onClick={() => openActionDialog(proposal, 'reject')}
                                        >
                                          Reject
                                        </Button>
                                      </>
                                    )}

                                    {proposal.status?.toUpperCase() === 'ACCEPTED' && (
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => navigate(`/proposals/${proposal.id}/create-contract`)}
                                      >
                                        Create Contract
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
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'accept' ? 'Accept Proposal' : 'Reject Proposal'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Message to Freelancer"
            value={actionMessage}
            onChange={(e) => setActionMessage(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleProposalAction}
            variant="contained"
            color={actionType === 'accept' ? 'success' : 'error'}
            disabled={actionLoading === selectedProposal?.id}
          >
            {actionLoading === selectedProposal?.id ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientProposalsList;
