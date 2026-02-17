// API Endpoint Testing Utility
// Save this as: src/utils/apiTester.js
// Usage: In browser console, run: testProposalEndpoints()

export const testProposalEndpoints = async () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    console.error('❌ No token found. Please log in first.');
    return;
  }

  console.log('🔍 Testing Proposal API Endpoints...');
  console.log('User:', user);
  console.log('Token:', token.substring(0, 20) + '...');
  console.log('---');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const baseUrl = 'http://localhost:10000/api';

  // Test 1: Get all proposals
  console.log('\n📋 Test 1: GET /proposals (all proposals)');
  try {
    const response = await fetch(`${baseUrl}/proposals`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  // Test 2: Get my proposals
  console.log('\n📋 Test 2: GET /proposals/my-proposals (my proposals)');
  try {
    const response = await fetch(`${baseUrl}/proposals/my-proposals`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    if (response.ok) {
      console.log('✅ Success! Found', Array.isArray(data) ? data.length : (data.data?.length || 0), 'proposals');
      console.log('Data:', data);
    } else {
      console.error('❌ Failed:', data);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  // Test 3: Get proposals for a job
  console.log('\n📋 Test 3: GET /proposals/job/1 (proposals for job ID 1)');
  try {
    const response = await fetch(`${baseUrl}/proposals/job/1`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  // Test 4: Get my jobs (for comparison)
  console.log('\n📋 Test 4: GET /jobs/my-jobs (for comparison)');
  try {
    const response = await fetch(`${baseUrl}/jobs/my-jobs`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  // Test 5: Get all jobs
  console.log('\n📋 Test 5: GET /jobs (all jobs)');
  try {
    const response = await fetch(`${baseUrl}/jobs`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Found', Array.isArray(data) ? data.length : (data.data?.length || 0), 'jobs');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  console.log('\n✅ Testing complete! Check the responses above.');
  console.log('\n💡 Tips:');
  console.log('- 400: Bad request or endpoint not found');
  console.log('- 401: Token invalid or expired');
  console.log('- 403: Not authorized to access');
  console.log('- 404: Endpoint does not exist');
};

// Also export a function to test user endpoints
export const testUserEndpoints = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('❌ No token found. Please log in first.');
    return;
  }

  console.log('🔍 Testing User/Auth API Endpoints...');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const baseUrl = 'http://localhost:10000/api';

  // Test user profile
  console.log('\n📋 Test 1: GET /users/profile (current user)');
  try {
    const response = await fetch(`${baseUrl}/users/profile`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }

  // Test auth status
  console.log('\n📋 Test 2: GET /auth/verify (verify token)');
  try {
    const response = await fetch(`${baseUrl}/auth/verify`, { headers });
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log('Response:', data);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
};

// Make functions globally available in browser console
if (typeof window !== 'undefined') {
  window.testProposalEndpoints = testProposalEndpoints;
  window.testUserEndpoints = testUserEndpoints;
  console.log('✅ API Tester loaded! Run testProposalEndpoints() in console to test.');
}

export default {
  testProposalEndpoints,
  testUserEndpoints
};
