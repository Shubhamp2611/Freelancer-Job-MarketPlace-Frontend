import axiosInstance from './axiosConfig';

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  forgotPassword: (email) => 
    axiosInstance.post('/auth/forgot-password', null, { params: { email } }),
  
  resetPassword: (data) => 
    axiosInstance.post('/auth/reset-password', data),
  
  refreshToken: (refreshToken) => 
    axiosInstance.post('/auth/refresh-token', refreshToken),
  
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/profile/me');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      // If 401, redirect to login
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw error;
    }
  },
};