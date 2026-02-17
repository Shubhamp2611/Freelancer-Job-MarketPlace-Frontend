import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  ArrowBack,
  AttachMoney,
  AccessTime,
  Person,
  CheckCircle,
  Cancel,
  Delete,
  Pending,
} from '@mui/icons-material';
import { proposalAPI } from '../api/proposalAPI';
import { jobAPI } from '../api/jobAPI';

const ProposalDetails = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ role: '' });
  const [proposal, setProposal] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionMessage, setActionMessage] = useState('');

  // Fetch user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Failed to parse user:', err);
    }
  }, []);

  const fetchProposalDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await proposalAPI.getProposalById(proposalId);
      setProposal(response.data);
      
      // Fetch job details if available
      if (response.data?.jobId) {
        try {
          const jobResponse = await jobAPI.getJobById(response.data.jobId);
          setJob(jobResponse.data);
        } catch (err) {
          console.log('Could not fetch job details');
        }
      }
    } catch (err) {
      setError('Failed to load proposal details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [proposalId]);

  useEffect(() => {
    if (proposalId) {
      fetchProposalDetails();
    }
  }, [proposalId, fetchProposalDetails]);

  const handleProposalAction = async () => {
    if (!proposal) return;

    try {
      setActionLoading(true);
      
      if (actionType === 'withdraw') {
        await proposalAPI.withdrawProposal(proposal.id);
        setSuccessMessage('Proposal withdrawn successfully!');
        setTimeout(() => navigate('/my-proposals'), 2000);
      } else if (actionType === 'accept') {
        await proposalAPI.acceptProposal(proposal.id, actionMessage);
        setSuccessMessage('Proposal accepted!');
        fetchProposalDetails();
      } else if (actionType === 'reject') {
        await proposalAPI.rejectProposal(proposal.id, actionMessage);
        setSuccessMessage('Proposal rejected.');
        fetchProposalDetails();
      }
      
      setActionDialogOpen(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${actionType} proposal`);
    } finally {
      setActionLoading(false);
    }
  };

  const openActionDialog = (type) => {
    setActionType(type);
    
    if (type === 'withdraw') {
      setActionMessage('');
    } else if (type === 'accept') {
      setActionMessage(`Congratulations! Your proposal has been accepted. We look forward to working with you.`);
    } else {
      setActionMessage(`Thank you for your proposal. Unfortunately, we have decided to go with another candidate.`);
    }
    
    setActionDialogOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACCEPTED':
        return <CheckCircle sx={{ fontSize: 32, color: 'green' }} />;
      case 'REJECTED':
        return <Cancel sx={{ fontSize: 32, color: 'red' }} />;
      case 'PENDING':
        return <Pending sx={{ fontSize: 32, color: 'orange' }} />;
      default:
        return <AccessTime sx={{ fontSize: 32, color: 'blue' }} />;
    }
  };

  const isFreelancer = user?.role === 'FREELANCER';
  const isClient = user?.role === 'CLIENT';

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading proposal details...
        </Typography>
      </Container>
    );
  }

  if (!proposal) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">Proposal not found</Alert>
        <Button variant="outlined" onClick={() => navigate('/my-proposals')} sx={{ mt: 2 }}>
          Back to Proposals
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/my-proposals')}
        sx={{ mb: 2 }}
      >
        Back to Proposals
      </Button>

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

      <Grid container spacing={3}>
        {/* Main Proposal Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            {/* Header with Status */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {job?.title || 'Proposal Details'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {getStatusIcon(proposal.status)}
                  <Chip
                    label={proposal.status || 'PENDING'}
                    color={proposal.status?.toUpperCase() === 'ACCEPTED' ? 'success' : 
                          proposal.status?.toUpperCase() === 'REJECTED' ? 'error' : 'warning'}
                  />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Job Information */}
            {job && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Job Description
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {job.description}
                </Typography>
                {job.skills && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Required Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {Array.isArray(job.skills) ? job.skills.map((skill, idx) => (
                        <Chip key={idx} label={skill} variant="outlined" size="small" />
                      )) : (
                        <Chip label={job.skills} variant="outlined" size="small" />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Cover Letter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                Cover Letter
              </Typography>
              <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {proposal.coverLetter}
                </Typography>
              </Paper>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Proposal Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Proposal Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <AttachMoney sx={{ fontSize: 32, color: 'success.main' }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Proposed Price
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        ${proposal.proposedPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <AccessTime sx={{ fontSize: 32, color: 'info.main' }} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Estimated Timeline
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {proposal.estimatedDays} days
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Submitted On
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {proposal.submittedDate 
                          ? new Date(proposal.submittedDate).toLocaleDateString()
                          : 'N/A'
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                        {proposal.status || 'PENDING'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar - Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Actions
            </Typography>

            {/* For Freelancers */}
            {isFreelancer && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {proposal.status?.toUpperCase() === 'PENDING' && (
                  <>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      startIcon={<Delete />}
                      onClick={() => openActionDialog('withdraw')}
                      disabled={actionLoading}
                    >
                      Withdraw Proposal
                    </Button>
                    <Typography variant="caption" color="text.secondary">
                      You can withdraw a pending proposal at any time.
                    </Typography>
                  </>
                )}

                {proposal.status?.toUpperCase() === 'ACCEPTED' && (
                  <Alert severity="success">
                    ✅ Your proposal has been accepted! The client should create a contract soon.
                  </Alert>
                )}

                {proposal.status?.toUpperCase() === 'REJECTED' && (
                  <Alert severity="error">
                    ❌ Unfortunately, your proposal was not selected for this job.
                  </Alert>
                )}
              </Box>
            )}

            {/* For Clients */}
            {isClient && proposal.status?.toUpperCase() === 'PENDING' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  startIcon={<CheckCircle />}
                  onClick={() => openActionDialog('accept')}
                  disabled={actionLoading}
                >
                  Accept Proposal
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<Cancel />}
                  onClick={() => openActionDialog('reject')}
                  disabled={actionLoading}
                >
                  Reject Proposal
                </Button>
              </Box>
            )}

            {isClient && proposal.status?.toUpperCase() === 'ACCEPTED' && (
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/proposals/${proposal.id}/create-contract`)}
              >
                Create Contract
              </Button>
            )}

            {/* Additional Info */}
            <Divider sx={{ my: 2 }} />

            {proposal.freelancerName && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  <Person sx={{ mr: 1, fontSize: 18 }} />
                  Freelancer
                </Typography>
                <Typography variant="body2">
                  {proposal.freelancerName}
                </Typography>
                {proposal.freelancerRating && (
                  <Typography variant="caption" color="text.secondary">
                    Rating: {proposal.freelancerRating}⭐
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'withdraw' ? 'Withdraw Proposal' : 
           actionType === 'accept' ? 'Accept Proposal' : 
           'Reject Proposal'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {actionType === 'withdraw' ? (
            <Typography variant="body2">
              Are you sure you want to withdraw this proposal? This action cannot be undone.
            </Typography>
          ) : (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Message to Freelancer"
              value={actionMessage}
              onChange={(e) => setActionMessage(e.target.value)}
              variant="outlined"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleProposalAction}
            variant="contained"
            color={actionType === 'accept' ? 'success' : 'error'}
            disabled={actionLoading}
          >
            {actionLoading ? 'Processing...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProposalDetails;