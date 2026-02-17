import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import { Edit, Save, Cancel, Work, AttachMoney, Star, LocationOn, Phone, Email } from '@mui/icons-material';
import { profileAPI } from '../api/profileAPI';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      const userData = response.data;
      setUser(userData);
      setEditData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        location: userData.location || '',
        bio: userData.bio || '',
        skills: userData.skills || '',
      });
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('Failed to load profile');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (editing) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || '',
      });
    }
    setEditing(!editing);
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      setError('');
      setSuccess('');
      
      await profileAPI.updateProfile(editData);
      await fetchProfile(); // Refresh profile data
      setSuccess('Profile updated successfully!');
      setEditing(false);
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <CircularProgress />
          <Typography>Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">Failed to load profile data</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">My Profile</Typography>
          <Button
            startIcon={editing ? <Cancel /> : <Edit />}
            onClick={handleEditToggle}
            variant={editing ? "outlined" : "contained"}
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ 
              width: 120, 
              height: 120, 
              fontSize: 48,
              margin: '0 auto',
              mb: 2
            }}>
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Chip 
              label={user.role || 'USER'} 
              color="primary" 
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {editing ? (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Full Name"
                    value={editData.name}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    margin="normal"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    value={editData.location}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="bio"
                    label="Bio"
                    multiline
                    rows={3}
                    value={editData.bio}
                    onChange={handleInputChange}
                    margin="normal"
                    placeholder="Tell us about yourself..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="skills"
                    label="Skills"
                    value={editData.skills}
                    onChange={handleInputChange}
                    margin="normal"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      disabled={saveLoading}
                    >
                      {saveLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <Typography variant="h4" gutterBottom>{user.name}</Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  {user.email && (
                    <Chip 
                      icon={<Email />} 
                      label={user.email}
                      variant="outlined"
                    />
                  )}
                  {user.phone && (
                    <Chip 
                      icon={<Phone />} 
                      label={user.phone}
                      variant="outlined"
                    />
                  )}
                  {user.location && (
                    <Chip 
                      icon={<LocationOn />} 
                      label={user.location}
                      variant="outlined"
                    />
                  )}
                </Box>
                
                {user.bio && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      About Me
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
                      {user.bio}
                    </Typography>
                  </>
                )}
                
                {user.skills && (
                  <>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {user.skills.split(',').map((skill, index) => (
                        <Chip 
                          key={index}
                          label={skill.trim()}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      {/* Stats Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Profile Stats
        </Typography>
        
        <Grid container spacing={3}>
          {user.role === 'FREELANCER' ? (
            <>
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Work sx={{ fontSize: 30, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5">{user.completedJobs || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Completed Jobs
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <AttachMoney sx={{ fontSize: 30, color: 'success.main', mb: 1 }} />
                  <Typography variant="h5">${user.totalEarnings || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Earnings
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Star sx={{ fontSize: 30, color: 'warning.main', mb: 1 }} />
                  <Typography variant="h5">{user.rating || 'N/A'}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating
                  </Typography>
                </Paper>
              </Grid>
            </>
          ) : user.role === 'CLIENT' && (
            <>
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Work sx={{ fontSize: 30, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h5">{user.postedJobs || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Jobs Posted
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <AttachMoney sx={{ fontSize: 30, color: 'success.main', mb: 1 }} />
                  <Typography variant="h5">${user.totalSpent || 0}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Spent
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={6} md={3}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                  <Star sx={{ fontSize: 30, color: 'info.main', mb: 1 }} />
                  <Typography variant="h5">{user.clientRating || 'N/A'}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Client Rating
                  </Typography>
                </Paper>
              </Grid>
            </>
          )}
          
          <Grid item xs={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h5">{new Date(user.createdAt).getFullYear()}</Typography>
              <Typography variant="body2" color="textSecondary">
                Member Since
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfilePage;