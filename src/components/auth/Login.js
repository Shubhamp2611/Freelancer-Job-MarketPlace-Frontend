import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Grid,
  Divider,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { 
  Visibility, 
  VisibilityOff,
  Email,
  Lock,
  Person,
  Work,
  AdminPanelSettings,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: (credentials) => dispatch(login(credentials)).unwrap(),
    onSuccess: (response) => {
      const user = response.user;
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else if (user.role === 'CLIENT') {
        navigate('/');
      } else if (user.role === 'FREELANCER') {
        navigate('/');
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      setError(error || 'Login failed. Please check your credentials.');
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    loginMutation.mutate(formData);
  };

  const handleDemoLogin = (role) => {
    const demos = {
      admin: { email: 'admin@marketplace.com', password: 'admin123' },
      client: { email: 'client@example.com', password: 'client123' },
      freelancer: { email: 'freelancer@example.com', password: 'freelancer123' },
    };
    
    const cred = demos[role];
    if (cred) {
      setFormData(cred);
      setTimeout(() => loginMutation.mutate(cred), 100);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  return (
    <Box sx={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '500px' }}
      >
        <Container maxWidth="sm">
          <Paper 
            elevation={24}
            sx={{ 
              p: { xs: 3, sm: 5 },
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                    mb: 2,
                  }}
                >
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 900 }}>
                    FH
                  </Typography>
                </Box>
              </motion.div>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 0.5
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Sign in to FreelanceHub to continue
              </Typography>
            </Box>
            
            {error && (
              <Fade in={!!error}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: '12px',
                    '& .MuiAlert-icon': { alignItems: 'center' }
                  }}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              </Fade>
            )}
            
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loginMutation.isPending}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
              
              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loginMutation.isPending}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#667eea' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                    },
                  },
                }}
              />
              
              <Box sx={{ textAlign: 'right', mt: 1.5, mb: 3 }}>
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    textDecoration: 'none',
                    color: '#667eea',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loginMutation.isPending}
                  sx={{
                    py: 1.75,
                    borderRadius: '12px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a67d8, #6b46a1)',
                      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.5)',
                    },
                  }}
                >
                  {loginMutation.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </motion.div>
            </form>
            
            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Quick Access Demo
              </Typography>
            </Divider>
            
            {/* Demo Accounts */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                align="center" 
                display="block"
                gutterBottom
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Try the platform with demo accounts
              </Typography>
              <Grid container spacing={2}>
                {[
                  { role: 'admin', icon: <AdminPanelSettings />, color: '#ef4444' },
                  { role: 'client', icon: <Person />, color: '#10b981' },
                  { role: 'freelancer', icon: <Work />, color: '#667eea' }
                ].map(({ role, icon, color }) => (
                  <Grid item xs={12} sm={4} key={role}>
                    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin(role)}
                        disabled={loginMutation.isPending}
                        startIcon={icon}
                        sx={{
                          py: 1.5,
                          borderRadius: '12px',
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          borderColor: '#e5e7eb',
                          color: color,
                          borderWidth: 2,
                          '&:hover': {
                            borderColor: color,
                            backgroundColor: `${color}10`,
                            borderWidth: 2,
                          },
                        }}
                      >
                        {role}
                      </Button>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid #e5e7eb' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                Don't have an account?
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  startIcon={<Person />}
                  sx={{
                    borderRadius: '12px',
                    px: 4,
                    py: 1.25,
                    borderColor: '#667eea',
                    color: '#667eea',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#5a67d8',
                      backgroundColor: 'rgba(102, 126, 234, 0.08)',
                      borderWidth: 2,
                    },
                  }}
                >
                  Create New Account
                </Button>
              </motion.div>
            </Box>
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="caption" color="text.secondary" align="center" display="block">
                By signing in, you agree to our <Link to="/terms" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>Terms</Link> and <Link to="/privacy" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </motion.div>
    </Box>
  );
};

export default Login;