import axiosInstance from './axiosConfig';

/**
 * Test connection to the backend API
 * Useful for debugging connection issues
 */
export const testBackendConnection = async () => {
  const tests = [];
  
  // Test 1: Health endpoint
  try {
    const health = await axiosInstance.get('/health');
    tests.push({ 
      name: 'Health Check', 
      status: '✅', 
      message: 'Backend is running',
      data: health.data 
    });
  } catch (error) {
    tests.push({ 
      name: 'Health Check', 
      status: '❌', 
      message: 'Backend is not reachable',
      error: error.message,
      url: error.config?.url 
    });
  }
  
  // Test 2: Public jobs endpoint (no auth required)
  try {
    const jobs = await axiosInstance.get('/jobs/open');
    tests.push({ 
      name: 'Jobs API (Open)', 
      status: '✅', 
      message: `Found ${jobs.data?.length || 0} open jobs`,
      count: jobs.data?.length 
    });
  } catch (error) {
    tests.push({ 
      name: 'Jobs API (Open)', 
      status: '❌', 
      message: error.message,
      status_code: error.response?.status
    });
  }
  
  // Test 3: Login endpoint test (structure only, don't send real creds)
  try {
    // This should fail with 400/401, but we're testing connectivity
    await axiosInstance.post('/auth/login', { 
      email: 'test@test.com', 
      password: 'test' 
    });
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 400) {
      tests.push({ 
        name: 'Auth API', 
        status: '✅', 
        message: 'Auth endpoint is reachable',
        status_code: error.response?.status
      });
    } else {
      tests.push({ 
        name: 'Auth API', 
        status: '❌', 
        message: error.message,
        status_code: error.response?.status
      });
    }
  }
  
  // Test 4: Check API base URL
  tests.push({
    name: 'Configuration',
    status: 'ℹ️',
    message: `API Base URL: ${axiosInstance.defaults.baseURL}`
  });
  
  // Test 5: Check token in localStorage
  const token = localStorage.getItem('token');
  tests.push({
    name: 'Authentication',
    status: token ? '✅' : 'ℹ️',
    message: token ? 'Token found in localStorage' : 'No token in localStorage (not logged in)'
  });
  
  // Log results
  console.log('\n=== Backend Connection Tests ===\n');
  console.table(tests);
  console.log('\n================================\n');
  
  return tests;
};

/**
 * Test specific endpoints
 */
export const testEndpoint = async (method, url, data = null) => {
  try {
    let response;
    switch (method.toUpperCase()) {
      case 'GET':
        response = await axiosInstance.get(url);
        break;
      case 'POST':
        response = await axiosInstance.post(url, data);
        break;
      case 'PUT':
        response = await axiosInstance.put(url, data);
        break;
      case 'DELETE':
        response = await axiosInstance.delete(url);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    return {
      success: true,
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      error: error.response?.data || error.message
    };
  }
};

/**
 * Debug API call with detailed logging
 */
export const debugAPICall = async (method, url, data = null) => {
  console.log(`\n🔍 Debugging API Call: ${method.toUpperCase()} ${url}\n`);
  console.log('Request Data:', data);
  console.log('Headers:', axiosInstance.defaults.headers);
  
  try {
    const result = await testEndpoint(method, url, data);
    console.log('Response Status:', result.status);
    console.log('Response Data:', result.data);
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
