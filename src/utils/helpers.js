// src/utils/helpers.js

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

// Format date
export const formatDate = (dateString, format = 'display') => {
  const date = new Date(dateString);
  
  if (format === 'relative') {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get user initials
export const getUserInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Calculate platform fee
export const calculatePlatformFee = (amount, percentage = 10) => {
  return (amount * percentage) / 100;
};

// Calculate freelancer earnings
export const calculateFreelancerEarnings = (amount, percentage = 10) => {
  const fee = calculatePlatformFee(amount, percentage);
  return amount - fee;
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password strength
export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 6) errors.push('Must be at least 6 characters');
  if (!/[A-Z]/.test(password)) errors.push('Must contain at least one uppercase letter');
  if (!/[0-9]/.test(password)) errors.push('Must contain at least one number');
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    // Job status
    OPEN: 'success',
    IN_PROGRESS: 'primary',
    COMPLETED: 'default',
    CANCELLED: 'error',
    EXPIRED: 'warning',
    
    // Proposal status
    PENDING: 'warning',
    ACCEPTED: 'success',
    REJECTED: 'error',
    WITHDRAWN: 'default',
    
    // Contract status
    ACTIVE: 'primary',
    COMPLETED: 'success',
    CANCELLED: 'error',
    DISPUTED: 'warning',
    
    // Milestone status
    PENDING: 'default',
    IN_PROGRESS: 'primary',
    SUBMITTED: 'info',
    REVISION_REQUESTED: 'warning',
    APPROVED: 'success',
    PAID: 'success',
  };
  
  return colors[status] || 'default';
};

// Get status icon
export const getStatusIcon = (status) => {
  const icons = {
    OPEN: '🔓',
    IN_PROGRESS: '⚡',
    COMPLETED: '✅',
    CANCELLED: '❌',
    PENDING: '⏳',
    ACCEPTED: '👍',
    REJECTED: '👎',
    ACTIVE: '📝',
    DISPUTED: '⚠️',
  };
  
  return icons[status] || '📄';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Parse skills string
export const parseSkills = (skillsString) => {
  if (!skillsString) return [];
  return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
};

// Check if user has role
export const hasRole = (user, role) => {
  if (!user || !user.role) return false;
  return user.role === role;
};

// Get user dashboard route
export const getUserDashboardRoute = (user) => {
  if (!user) return '/login';
  
  switch (user.role) {
    case 'ADMIN':
      return '/admin';
    case 'CLIENT':
      return '/client/dashboard';
    case 'FREELANCER':
      return '/freelancer/dashboard';
    default:
      return '/';
  }
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 422:
        return data.message || 'Validation error.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred.';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred.';
  }
};