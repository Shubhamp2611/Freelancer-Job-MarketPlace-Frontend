/* eslint-disable no-unused-vars */
// Test what proposal endpoints work
const token = localStorage.getItem('token');
const headers = { 'Authorization': `Bearer ${token}` };

// Test 1: Submit a proposal
async function submitTestProposal() {
  try {
    const response = await fetch('http://localhost:8080/api/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        jobId: 1, // Change to a real job ID from your my-jobs
        coverLetter: 'I am very interested in this job and have extensive experience.',
        proposedPrice: 800,
        estimatedDays: 20
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Proposal submitted:', data);
    } else {
      console.log('❌ Failed to submit proposal:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test 2: Check if freelancer endpoints work
async function testFreelancerEndpoints() {
  const endpoints = [
    '/api/proposals', // POST endpoint
    '/api/contracts/my-contracts',
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'GET',
        headers: headers
      });
      console.log(`${endpoint}: ${response.status}`);
    } catch (error) {
      console.log(`${endpoint}: ❌ ${error.message}`);
    }
  }
}

submitTestProposal();
// testFreelancerEndpoints();