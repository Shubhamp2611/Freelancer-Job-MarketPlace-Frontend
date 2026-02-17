/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AttachMoney,
  AccessTime,
  Person,
  Description,
  CheckCircle,
  Payment,
  Star,
  RateReview,
} from '@mui/icons-material';
import { contractAPI } from '../../api/contractAPI';

const ContractDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [funding, setFunding] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchContractDetails();
  }, [id]);

  const fetchContractDetails = async () => {
    try {
      setLoading(true);
      const response = await contractAPI.getContractById(id);
      setContract(response.data);
    } catch (err) {
      setError('Failed to fetch contract details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFundEscrow = async () => {
    if (!window.confirm(`Are you sure you want to fund $${contract.amount} to escrow?`)) {
      return;
    }

    try {
      setFunding(true);
      await contractAPI.fundEscrow(id);
      alert('✅ Escrow funded successfully!');
      fetchContractDetails(); // Refresh contract data
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fund escrow');
    } finally {
      setFunding(false);
    }
  };

  const handleCompleteContract = async () => {
    if (!review.trim()) {
      alert('Please provide a review');
      return;
    }

    try {
      setCompleting(true);
      await contractAPI.completeContract(id, rating, review);
      alert('✅ Contract completed successfully! Payment has been released to freelancer.');
      setCompletionDialogOpen(false);
      fetchContractDetails();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to complete contract');
    } finally {
      setCompleting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'ACTIVE': return 'info';
      case 'IN_PROGRESS': return 'primary';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getActiveStep = (status) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'ACTIVE': return 1;
      case 'IN_PROGRESS': return 2;
      case 'COMPLETED': return 3;
      default: return 0;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography>Loading contract details...</Typography>
      </Container>
    );
  }

  if (error && !contract) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate('/contracts')} sx={{ mt: 2 }}>
          Back to Contracts
        </Button>
      </Container>
    );
  }

  if (!contract) return null;

  const isClient = user.role === 'CLIENT' && user.id === contract.clientId;
  const isFreelancer = user.role === 'FREELANCER' && user.id === contract.freelancerId;
  const canFund = isClient && contract.status === 'PENDING';
  const canComplete = isClient && contract.status === 'IN_PROGRESS';
  const canStartWork = isFreelancer && contract.status === 'ACTIVE';

  const steps = [
    'Contract Created',
    'Escrow Funded',
    'Work in Progress',
    'Completed'
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4">Contract: {contract.jobTitle}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip 
              label={`$${contract.amount}`} 
              color="primary" 
              icon={<AttachMoney />}
            />
            <Chip 
              label={contract.status} 
              color={getStatusColor(contract.status)}
            />
          </Box>
        </Box>

        {/* Progress Stepper */}
        <Stepper activeStep={getActiveStep(contract.status)} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Job Details */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Description sx={{ mr: 1 }} /> Job Details
                </Typography>
                <Typography variant="body1">
                  <strong>Title:</strong> {contract.jobTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  {contract.jobDescription?.substring(0, 150)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Timeline */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1 }} /> Timeline
                </Typography>
                <Typography variant="body2">
                  <strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Expected Completion:</strong> {new Date(contract.expectedCompletionDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Created:</strong> {new Date(contract.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Client & Freelancer Info */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} /> Client
                </Typography>
                <Typography variant="body1">{contract.clientName}</Typography>
                <Typography variant="body2" color="textSecondary">{contract.clientEmail}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ mr: 1 }} /> Freelancer
                </Typography>
                <Typography variant="body1">{contract.freelancerName}</Typography>
                <Typography variant="body2" color="textSecondary">{contract.freelancerEmail}</Typography>
                {contract.freelancerRating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Star sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                    <Typography variant="body2">{contract.freelancerRating} / 5</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Actions based on role and status */}
        <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Contract Actions
          </Typography>
          
          {canFund && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please fund the escrow to activate this contract. The amount will be held securely until work is completed.
              </Alert>
              <Button
                variant="contained"
                startIcon={<Payment />}
                onClick={handleFundEscrow}
                disabled={funding}
              >
                {funding ? <CircularProgress size={24} /> : `Fund Escrow ($${contract.amount})`}
              </Button>
            </Box>
          )}

          {canStartWork && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Escrow has been funded! You can now start working on this project.
              </Alert>
              <Button
                variant="contained"
                onClick={() => {
                  // Mark contract as in progress
                  alert('Work started! Update your progress regularly.');
                }}
              >
                Start Work
              </Button>
            </Box>
          )}

          {canComplete && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                Review the work and complete the contract to release payment to the freelancer.
              </Alert>
              <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={() => setCompletionDialogOpen(true)}
              >
                Complete Contract
              </Button>
            </Box>
          )}

          {contract.status === 'COMPLETED' && contract.clientReview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Your Review
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    sx={{ color: i < contract.clientRating ? 'warning.main' : 'grey.300' }}
                  />
                ))}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {contract.clientRating}/5
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                "{contract.clientReview}"
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/contracts')}
          >
            Back to Contracts
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/jobs/${contract.jobId}`)}
          >
            View Job
          </Button>
        </Box>
      </Paper>

      {/* Completion Dialog */}
      <Dialog open={completionDialogOpen} onClose={() => setCompletionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Complete Contract</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Please rate the freelancer's work and provide a review. The payment will be released upon completion.
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Rating
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  sx={{
                    cursor: 'pointer',
                    fontSize: 32,
                    color: value <= rating ? 'warning.main' : 'grey.300',
                    '&:hover': { color: 'warning.light' }
                  }}
                  onClick={() => setRating(value)}
                />
              ))}
            </Box>
            <Typography variant="caption" color="textSecondary">
              {rating} out of 5 stars
            </Typography>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            margin="normal"
            placeholder="Share your experience working with this freelancer..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompletionDialogOpen(false)} disabled={completing}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCompleteContract}
            disabled={completing || !review.trim()}
          >
            {completing ? <CircularProgress size={24} /> : 'Complete & Release Payment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContractDetails;