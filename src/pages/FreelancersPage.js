import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
  Avatar,
  Rating,
  CircularProgress,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Star as StarIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FreelancersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const mockFreelancers = [
      {
        id: 1,
        name: 'John Smith',
        title: 'Full Stack Developer',
        avatar: 'https://via.placeholder.com/100',
        rating: 4.8,
        reviews: 240,
        hourlyRate: 75,
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        category: 'Web Development',
        bio: 'Experienced full stack developer with 8+ years of experience',
        completedJobs: 450,
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        title: 'UI/UX Designer',
        avatar: 'https://via.placeholder.com/100',
        rating: 4.9,
        reviews: 180,
        hourlyRate: 65,
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        category: 'Design',
        bio: 'Creative designer specializing in mobile and web applications',
        completedJobs: 320,
        isAvailable: true,
      },
      {
        id: 3,
        name: 'Mike Chen',
        title: 'Data Scientist',
        avatar: 'https://via.placeholder.com/100',
        rating: 4.7,
        reviews: 95,
        hourlyRate: 85,
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
        category: 'Data Science',
        bio: 'Expert in machine learning and data analysis',
        completedJobs: 150,
        isAvailable: false,
      },
      {
        id: 4,
        name: 'Emma Williams',
        title: 'Mobile App Developer',
        avatar: 'https://via.placeholder.com/100',
        rating: 4.6,
        reviews: 210,
        hourlyRate: 70,
        skills: ['React Native', 'Flutter', 'iOS', 'Android'],
        category: 'Mobile Development',
        bio: 'Specialized in cross-platform mobile application development',
        completedJobs: 280,
        isAvailable: true,
      },
    ];

    setFreelancers(mockFreelancers);
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !categoryFilter || freelancer.category === categoryFilter;
    const matchesRating = !ratingFilter || freelancer.rating >= parseFloat(ratingFilter);

    return matchesSearch && matchesCategory && matchesRating;
  });

  const handleHire = (freelancerId) => {
    alert(`Hire freelancer ${freelancerId}`);
  };

  const handleViewProfile = (freelancerId) => {
    window.location.href = `/freelancer/${freelancerId}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Find Top Freelancers
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Search freelancers..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Web Development">Web Development</MenuItem>
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Mobile Development">Mobile Development</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Minimum Rating</InputLabel>
              <Select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                label="Minimum Rating"
              >
                <MenuItem value="">All Ratings</MenuItem>
                <MenuItem value="4.5">4.5+ stars</MenuItem>
                <MenuItem value="4.0">4.0+ stars</MenuItem>
                <MenuItem value="3.5">3.5+ stars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Freelancers Grid */}
      <Grid container spacing={3}>
        {filteredFreelancers.length > 0 ? (
          filteredFreelancers.map(freelancer => (
            <Grid item xs={12} md={6} lg={4} key={freelancer.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={freelancer.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">{freelancer.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {freelancer.title}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={freelancer.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {freelancer.rating} ({freelancer.reviews} reviews)
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {freelancer.bio}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                      Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {freelancer.skills.map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        ${freelancer.hourlyRate}/hr
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {freelancer.completedJobs} jobs
                      </Typography>
                    </Box>
                    <Chip
                      label={freelancer.isAvailable ? 'Available' : 'Not Available'}
                      color={freelancer.isAvailable ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleViewProfile(freelancer.id)}
                  >
                    View Profile
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleHire(freelancer.id)}
                    disabled={!freelancer.isAvailable}
                  >
                    Send Proposal
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography>No freelancers found matching your criteria.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FreelancersPage;
