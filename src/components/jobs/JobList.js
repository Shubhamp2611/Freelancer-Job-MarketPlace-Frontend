/* eslint-disable react/jsx-no-undef */
// src/components/jobs/JobList.js
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { useQuery } from 'react-query';
import { jobAPI } from '../../api/jobAPI';
import { Link } from 'react-router-dom';

const JobList = ({ filter = 'open' }) => {
  const { data: jobs, isLoading, error } = useQuery(
    ['jobs', filter],
    () => jobAPI.getJobs(filter),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <Typography>Loading jobs...</Typography>;
  if (error) return <Typography color="error">Error loading jobs</Typography>;

  return (
    <Grid container spacing={3}>
      {jobs?.data?.map((job) => (
        <Grid item xs={12} md={6} lg={4} key={job.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {job.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {job.description.substring(0, 150)}...
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={job.status}
                  color={job.status === 'OPEN' ? 'success' : 'default'}
                  size="small"
                />
                <Chip
                  label={`$${job.budget}`}
                  color="primary"
                  size="small"
                  sx={{ ml: 1 }}
                />
                <Chip
                  label={job.type}
                  variant="outlined"
                  size="small"
                  sx={{ ml: 1 }}
                />
              </Box>
              
              <Typography variant="body2">
                <strong>Skills:</strong> {job.skillsRequired}
              </Typography>
              
              <Typography variant="body2">
                <strong>Client:</strong> {job.clientName}
              </Typography>
            </CardContent>
            
            <CardActions>
              <Button
                size="small"
                component={Link}
                to={`/jobs/${job.id}`}
              >
                View Details
              </Button>
              
              {localStorage.getItem('userRole') === 'FREELANCER' && job.status === 'OPEN' && (
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/jobs/${job.id}/apply`}
                >
                  Apply
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;