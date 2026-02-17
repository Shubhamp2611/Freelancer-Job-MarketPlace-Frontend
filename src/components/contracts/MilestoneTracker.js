// src/components/contracts/MilestoneTracker.js
import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  Chip,
  Button,
  TextField,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  Pending,
  PlayCircle,
  HourglassEmpty,
  Task,
} from '@mui/icons-material';
import { useMutation,useQuery } from '@tanstack/react-query';
import { contractAPI } from '../../api/contractAPI';
import LoadingSpinner from '../common/LoadingSpinner';

const MilestoneTracker = ({ contractId, userRole }) => {
  const [feedback, setFeedback] = React.useState('');
  
  const { data: milestones, isLoading, error, refetch } = useQuery(
    ['milestones', contractId],
    () => contractAPI.getMilestones(contractId),
    { enabled: !!contractId }
  );

  const submitMilestoneMutation = useMutation(
    ({ milestoneId, deliverables }) =>
      contractAPI.submitMilestone(milestoneId, deliverables),
    {
      onSuccess: () => {
        refetch();
        alert('Milestone submitted successfully!');
      },
    }
  );

  const approveMilestoneMutation = useMutation(
    ({ milestoneId, feedback }) =>
      contractAPI.approveMilestone(milestoneId, feedback),
    {
      onSuccess: () => {
        refetch();
        alert('Milestone approved!');
      },
    }
  );

  const requestRevisionMutation = useMutation(
    ({ milestoneId, feedback }) =>
      contractAPI.requestRevision(milestoneId, feedback),
    {
      onSuccess: () => {
        refetch();
        alert('Revision requested!');
      },
    }
  );

  const getStepIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
      case 'APPROVED':
      case 'PAID':
        return <CheckCircle color="success" />;
      case 'IN_PROGRESS':
        return <PlayCircle color="primary" />;
      case 'SUBMITTED':
        return <Task color="warning" />;
      case 'REVISION_REQUESTED':
        return <HourglassEmpty color="error" />;
      default:
        return <Pending color="disabled" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
      case 'PAID':
      case 'COMPLETED':
        return 'success';
      case 'IN_PROGRESS':
        return 'primary';
      case 'SUBMITTED':
        return 'warning';
      case 'REVISION_REQUESTED':
        return 'error';
      default:
        return 'default';
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading milestones..." />;
  if (error) return <Alert severity="error">Error loading milestones</Alert>;

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Milestones
      </Typography>
      
      <Stepper orientation="vertical">
        {milestones?.data?.map((milestone) => (
          <Step key={milestone.id} active={true}>
            <StepLabel StepIconComponent={() => getStepIcon(milestone.status)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="subtitle1">{milestone.title}</Typography>
                <Chip
                  label={milestone.status}
                  size="small"
                  color={getStatusColor(milestone.status)}
                />
                <Chip
                  label={`$${milestone.amount}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </StepLabel>
            
            <StepContent>
              <Typography variant="body2" paragraph>
                {milestone.description}
              </Typography>
              
              {milestone.deliverables && (
                <Typography variant="body2" color="textSecondary">
                  <strong>Deliverables:</strong> {milestone.deliverables}
                </Typography>
              )}
              
              {milestone.clientFeedback && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  <strong>Client Feedback:</strong> {milestone.clientFeedback}
                </Alert>
              )}
              
              {/* Action Buttons */}
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                {userRole === 'FREELANCER' && (
                  <>
                    {milestone.status === 'IN_PROGRESS' && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          const deliverables = prompt('Enter deliverables:');
                          if (deliverables) {
                            submitMilestoneMutation.mutate({
                              milestoneId: milestone.id,
                              deliverables,
                            });
                          }
                        }}
                      >
                        Submit for Review
                      </Button>
                    )}
                    
                    {milestone.status === 'REVISION_REQUESTED' && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const deliverables = prompt('Enter revised deliverables:');
                          if (deliverables) {
                            submitMilestoneMutation.mutate({
                              milestoneId: milestone.id,
                              deliverables,
                            });
                          }
                        }}
                      >
                        Submit Revision
                      </Button>
                    )}
                  </>
                )}
                
                {userRole === 'CLIENT' && (
                  <>
                    {milestone.status === 'SUBMITTED' && (
                      <>
                        <TextField
                          size="small"
                          placeholder="Feedback (optional)"
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          sx={{ flexGrow: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() =>
                            approveMilestoneMutation.mutate({
                              milestoneId: milestone.id,
                              feedback,
                            })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => {
                            const revisionFeedback = prompt('Enter revision feedback:');
                            if (revisionFeedback) {
                              requestRevisionMutation.mutate({
                                milestoneId: milestone.id,
                                feedback: revisionFeedback,
                              });
                            }
                          }}
                        >
                          Request Revision
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
              
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Due: {new Date(milestone.dueDate).toLocaleDateString()}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default MilestoneTracker;