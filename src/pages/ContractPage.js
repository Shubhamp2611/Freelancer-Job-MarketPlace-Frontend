// src/pages/ContractsPage.js
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  FilterList,
  Add,
  Description,
} from '@mui/icons-material';
import { useQuery } from 'react-query';
import { contractAPI } from '../api/contractAPI';
import ContractCard from '../components/contracts/ContractCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ContractsPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const { data: contracts, isLoading, refetch } = useQuery(
    ['contracts', tabValue],
    () => contractAPI.getMyContracts(),
    { refetchOnWindowFocus: false }
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getFilteredContracts = () => {
    if (!contracts) return [];
    
    let filtered = contracts.data || [];
    
    // Filter by tab
    switch (tabValue) {
      case 0: // All
        break;
      case 1: // Active
        filtered = filtered.filter(c => c.status === 'ACTIVE');
        break;
      case 2: // Completed
        filtered = filtered.filter(c => c.status === 'COMPLETED');
        break;
      case 3: // Disputed
        filtered = filtered.filter(c => c.status === 'DISPUTED');
        break;
    }
    
    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter(c => c.status === filterStatus);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'amount_high':
          return b.totalAmount - a.totalAmount;
        case 'amount_low':
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  const filteredContracts = getFilteredContracts();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">My Contracts</Typography>
        {user.role === 'CLIENT' && (
          <Button variant="contained" startIcon={<Add />}>
            New Contract
          </Button>
        )}
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterStatus}
                  label="Status"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  startAdornment={<FilterList fontSize="small" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="ALL">All Status</MenuItem>
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="CANCELLED">Cancelled</MenuItem>
                  <MenuItem value="DISPUTED">Disputed</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="amount_high">Amount (High to Low)</MenuItem>
                  <MenuItem value="amount_low">Amount (Low to High)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Contracts" />
          <Tab label="Active" />
          <Tab label="Completed" />
          <Tab label="Disputed" />
        </Tabs>
      </Paper>

      {/* Contract Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="primary">
              {contracts?.data?.length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Contracts
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="success.main">
              {contracts?.data?.filter(c => c.status === 'ACTIVE').length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Active
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="warning.main">
              {contracts?.data?.filter(c => c.status === 'COMPLETED').length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="error.main">
              {contracts?.data?.filter(c => c.status === 'DISPUTED').length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Disputed
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Contracts Grid */}
      {filteredContracts.length > 0 ? (
        <Grid container spacing={3}>
          {filteredContracts.map((contract) => (
            <Grid item xs={12} md={6} lg={4} key={contract.id}>
              <ContractCard contract={contract} userRole={user.role} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Description sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No contracts found
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            {searchTerm || filterStatus !== 'ALL'
              ? 'Try adjusting your search or filters'
              : user.role === 'CLIENT'
              ? 'Start by accepting a proposal to create your first contract'
              : 'Apply to jobs and get hired to start working on contracts'}
          </Typography>
          {user.role === 'CLIENT' && (
            <Button variant="contained" startIcon={<Add />}>
              Browse Proposals
            </Button>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default ContractsPage;