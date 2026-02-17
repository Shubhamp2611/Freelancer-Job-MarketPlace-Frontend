/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jobAPI } from '../../api/jobAPI';

const CreateJob = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'FIXED_PRICE',
    budget: '',
    estimatedDuration: '',
    skillsRequired: '',
  });

  const jobTypes = [
    { value: 'FIXED_PRICE', label: 'Fixed Price' },
    { value: 'HOURLY', label: 'Hourly' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'CONTRACT', label: 'Contract' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.budget) {
      setError('Please fill all required fields');
      return;
    }
    
    try {
      const response = await jobAPI.createJob(formData);
      setSuccess('Job created successfully!');
      setTimeout(() => {
        navigate('/jobs');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Post a New Job
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  label="Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  helperText="Be specific about the work needed"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Job Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  helperText="Describe the project in detail"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  name="type"
                  label="Job Type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="budget"
                  label="Budget ($)"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="estimatedDuration"
                  label="Estimated Duration (days)"
                  type="number"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="skillsRequired"
                  label="Required Skills"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  helperText="e.g., JavaScript, React, Node.js"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ flexGrow: 1 }}
              >
                Post Job
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateJob;