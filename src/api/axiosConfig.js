import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request deduplication cache
const requestCache = new Map();
const requestControllers = new Map();

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Create unique request key
    const requestKey = `${config.method}-${config.url}-${JSON.stringify(config.params || {})}`;
    
    // Cancel duplicate requests
    if (requestControllers.has(requestKey)) {
      const previousController = requestControllers.get(requestKey);
      previousController.abort();
    }
    
    // Create new abort controller for this request
    const controller = new AbortController();
    config.signal = controller.signal;
    requestControllers.set(requestKey, controller);
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}-${response.config.url}-${JSON.stringify(response.config.params || {})}`;
    requestControllers.delete(requestKey);
    return response;
  },
  (error) => {
    // Don't treat aborted requests as errors
    if (axios.isCancel(error)) {
      console.log('Previous request cancelled:', error.message);
      return Promise.reject(error);
    }
    
    // Log error for debugging
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Clean up request controller
    if (error.config) {
      const requestKey = `${error.config.method}-${error.config.url}-${JSON.stringify(error.config.params || {})}`;
      requestControllers.delete(requestKey);
    }
    
    // Handle 429 Too Many Requests with retry
    if (error.response?.status === 429) {
      console.warn('Rate limited (429). Please wait before making more requests.');
      // Don't show alert, let the component handle it gracefully
    }
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('Token expired or invalid, redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      alert('Request timeout. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;