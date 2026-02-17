import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  AttachMoney,
  AccessTime,
  Person,
  CheckCircle,
  HourglassEmpty,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { contractAPI } from '../api/contractAPI';

const ContractsList = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const response = await contractAPI.getMyContracts();
      setContracts(response.data || []);
    } catch (err) {
      setError('Failed to fetch contracts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredContracts = () => {
    const statusFilter = tabValue === 0 ? '' : 
                        tabValue === 1 ? 'ACTIVE' : 
                        tabValue === 2 ? 'IN_PROGRESS' : 'COMPLETED';
    
    if (!statusFilter) return contracts;
    return contracts.filter(contract => contract.status === statusFilter);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE': return <HourglassEmpty />;
      case 'COMPLETED': return <CheckCircle />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <CircularProgress />
          <Typography>Loading contracts...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Contracts
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab label="Active" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {getFilteredContracts().length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No contracts found
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {user.role === 'CLIENT' 
              ? 'Accept proposals on your jobs to create contracts.'
              : 'Clients will create contracts when they accept your proposals.'
            }
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(user.role === 'CLIENT' ? '/jobs' : '/jobs')}
          >
            {user.role === 'CLIENT' ? 'View My Jobs' : 'Browse Jobs'}
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {getFilteredContracts().map((contract) => (
            <Grid item xs={12} key={contract.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => navigate(`/contracts/${contract.id}`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="h6">{contract.jobTitle}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Contract #{contract.id}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Chip 
                        label={`$${contract.amount}`} 
                        color="primary" 
                        icon={<AttachMoney />}
                        sx={{ mb: 1 }}
                      />
                      <Chip 
                        label={contract.status}
                        color={getStatusColor(contract.status)}
                        icon={getStatusIcon(contract.status)}
                      />
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Person sx={{ mr: 1, fontSize: 16 }} />
                        <Typography variant="body2">
                          <strong>
                            {user.role === 'CLIENT' ? 'Freelancer:' : 'Client:'}
                          </strong>{' '}
                          {user.role === 'CLIENT' ? contract.freelancerName : contract.clientName}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTime sx={{ mr: 1, fontSize: 16 }} />
                        <Typography variant="body2">
                          Started: {new Date(contract.startDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {contract.jobDescription?.substring(0, 150)}...
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Created: {new Date(contract.createdAt).toLocaleDateString()}
                    </Typography>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ContractsList;