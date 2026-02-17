// src/components/contracts/ContractCard.js
import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Description,
  Person,
  CalendarToday,
  AttachMoney,
  CheckCircle,
  PendingActions,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const ContractCard = ({ contract, userRole }) => {
  const progress = contract.amountPaidToFreelancer
    ? (contract.amountPaidToFreelancer / contract.totalAmount) * 100
    : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return 'error';
      case 'DISPUTED':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getActionButtons = () => {
    const buttons = [];
    
    if (userRole === 'CLIENT') {
      if (!contract.escrowFunded) {
        buttons.push(
          <Button
            key="fund"
            size="small"
            color="primary"
            component={Link}
            to={`/contracts/${contract.id}/fund`}
          >
            Fund Escrow
          </Button>
        );
      }
      
      if (contract.status === 'ACTIVE') {
        buttons.push(
          <Button
            key="complete"
            size="small"
            component={Link}
            to={`/contracts/${contract.id}/complete`}
          >
            Complete
          </Button>
        );
      }
    }
    
    if (userRole === 'FREELANCER' && contract.status === 'ACTIVE') {
      buttons.push(
        <Button
          key="milestones"
          size="small"
          component={Link}
          to={`/contracts/${contract.id}/milestones`}
        >
          View Milestones
        </Button>
      );
    }
    
    buttons.push(
      <Button
        key="view"
        size="small"
        component={Link}
        to={`/contracts/${contract.id}`}
      >
        View Details
      </Button>
    );
    
    return buttons;
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            {contract.title}
          </Typography>
          <Chip
            label={contract.status}
            size="small"
            color={getStatusColor(contract.status)}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {contract.description.substring(0, 150)}...
        </Typography>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Description fontSize="small" color="action" />
            <Typography variant="body2">
              Job: {contract.jobTitle}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2">
              {userRole === 'CLIENT' ? 'Freelancer: ' : 'Client: '}
              {userRole === 'CLIENT' ? contract.freelancerName : contract.clientName}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2">
              Deadline: {new Date(contract.deadline).toLocaleDateString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney fontSize="small" color="action" />
            <Typography variant="body2">
              Amount: ${contract.totalAmount} | Paid: ${contract.amountPaidToFreelancer}
            </Typography>
          </Box>
        </Box>
        
        {contract.status === 'ACTIVE' && (
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption">Progress</Typography>
              <Typography variant="caption">{Math.round(progress)}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
        
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            icon={contract.escrowFunded ? <CheckCircle /> : <PendingActions />}
            label={contract.escrowFunded ? 'Escrow Funded' : 'Escrow Pending'}
            size="small"
            color={contract.escrowFunded ? 'success' : 'warning'}
            variant="outlined"
          />
          
          {contract.clientRating && (
            <Chip
              label={`Client Rating: ${contract.clientRating}/5`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          
          {contract.freelancerRating && (
            <Chip
              label={`Your Rating: ${contract.freelancerRating}/5`}
              size="small"
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>
      </CardContent>
      
      <CardActions>
        {getActionButtons()}
      </CardActions>
    </Card>
  );
};

export default ContractCard;