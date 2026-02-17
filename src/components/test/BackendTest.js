import React, { useState, useEffect } from 'react';
import { Button, Alert, Box, Typography } from '@mui/material';
import axios from 'axios';

const BackendTest = () => {
  const [status, setStatus] = useState('unknown');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    try {
      setStatus('testing');
      const response = await axios.get('http://localhost:8080/api/health');
      setStatus('connected');
      setMessage(`Backend is UP: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setStatus('error');
      setMessage(`Error: ${error.message}. Make sure Spring Boot server is running on port 8080.`);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Backend Connection Test
      </Typography>
      
      {status === 'connected' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ✅ {message}
        </Alert>
      )}
      
      {status === 'error' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          ❌ {message}
        </Alert>
      )}
      
      {status === 'testing' && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Testing connection to backend...
        </Alert>
      )}
      
      <Button variant="outlined" onClick={testConnection}>
        Test Again
      </Button>
    </Box>
  );
};

export default BackendTest;