// API utility functions
export const handleApiError = (error) => {
  console.error('API Error Details:', {
    message: error.message,
    response: error.response?.data,
    status: error.response?.status,
    url: error.config?.url
  });

  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Bad request. Please check your input.';
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return data.message || 'Conflict. Resource already exists.';
      case 422:
        return data.message || 'Validation error.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || `Error ${status}: ${data}`;
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your internet connection.';
  } else {
    // Something else happened
    return 'An unexpected error occurred.';
  }
};

export const validateResponse = (response) => {
  if (!response) {
    throw new Error('No response received from server');
  }
  
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  
  return response.data;
};

// Format API parameters
export const buildQueryParams = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => 
      value !== null && value !== undefined && value !== ''
    )
  );
  
  return new URLSearchParams(filteredParams).toString();
};