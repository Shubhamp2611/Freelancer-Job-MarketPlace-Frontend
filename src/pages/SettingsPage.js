import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications,
  Security,
  Palette,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../contexts/NotificationContext';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();
  const { user } = useSelector(state => state.auth || {});

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    privateProfile: false,
    showOnlineStatus: true,
  });

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);

  const handleSettingChange = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      // API call to save settings
      // await updateSettings(settings);
      showSuccess('Settings saved successfully!');
    } catch (error) {
      showError(error.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // API call to update profile
      // await updateProfile(profileData);
      showSuccess('Profile updated successfully!');
    } catch (error) {
      showError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
        <SettingsIcon /> Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Profile Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                  disabled
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Profile'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Notifications fontSize="small" /> Notifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                    />
                  }
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.smsNotifications}
                      onChange={() => handleSettingChange('smsNotifications')}
                    />
                  }
                  label="SMS Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.marketingEmails}
                      onChange={() => handleSettingChange('marketingEmails')}
                    />
                  }
                  label="Marketing Emails"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security fontSize="small" /> Security
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.twoFactorAuth}
                      onChange={() => handleSettingChange('twoFactorAuth')}
                    />
                  }
                  label="Two-Factor Authentication"
                />
                <Button variant="outlined" fullWidth sx={{ mt: 1 }}>
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Palette fontSize="small" /> Privacy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.privateProfile}
                      onChange={() => handleSettingChange('privateProfile')}
                    />
                  }
                  label="Private Profile"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showOnlineStatus}
                      onChange={() => handleSettingChange('showOnlineStatus')}
                    />
                  }
                  label="Show Online Status"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSaveSettings}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save All Settings'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SettingsPage;
