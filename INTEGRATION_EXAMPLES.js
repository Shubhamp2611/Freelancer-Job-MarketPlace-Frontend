// Quick Integration Examples
// Copy and use these snippets in your components

// ============================================
// 1. LOGIN EXAMPLE
// ============================================

import React, { useState } from 'react';
import { authAPI } from '../api/authAPI';
import { useNotification } from '../contexts/NotificationContext';

function LoginExample() {
  const [credentials, setCredentials] = useState({
    email: 'client@example.com',
    password: 'client123'
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      // Store tokens
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('email', response.data.email);
      
      showSuccess('Login successful!');
      // Redirect to dashboard
      window.location.href = '/';
    } catch (error) {
      showError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
}

// ============================================
// 2. FETCH JOBS EXAMPLE
// ============================================

import { jobAPI } from '../api/jobAPI';

function JobListExample() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getOpenJobs();
      setJobs(response.data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Budget: ${job.budget}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 3. CREATE JOB EXAMPLE (CLIENT)
// ============================================

import { jobAPI } from '../api/jobAPI';

async function createJobExample() {
  try {
    const jobData = {
      title: 'Build a Website',
      description: 'I need a responsive website for my business',
      budget: 2500,
      deadline: '2026-03-15',
      category: 'Web Development',
      type: 'FIXED_PRICE'
    };

    const response = await jobAPI.createJob(jobData);
    console.log('Job created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error.response?.data);
    throw error;
  }
}

// ============================================
// 4. SUBMIT PROPOSAL EXAMPLE (FREELANCER)
// ============================================

import { proposalAPI } from '../api/proposalAPI';

async function submitProposalExample(jobId) {
  try {
    const proposalData = {
      jobId: jobId,
      proposedAmount: 2200,
      timeline: '20 days',
      coverLetter: 'I have 8 years of web development experience. I can deliver quality work on time.'
    };

    const response = await proposalAPI.submitProposal(proposalData);
    console.log('Proposal submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting proposal:', error.response?.data);
    throw error;
  }
}

// ============================================
// 5. ACCEPT PROPOSAL EXAMPLE (CLIENT)
// ============================================

import { proposalAPI } from '../api/proposalAPI';

async function acceptProposalExample(proposalId) {
  try {
    const message = 'Great proposal! Looking forward to working with you.';
    const response = await proposalAPI.acceptProposal(proposalId, message);
    console.log('Proposal accepted, contract created:', response.data);
    return response.data; // Returns contract ID
  } catch (error) {
    console.error('Error accepting proposal:', error.response?.data);
    throw error;
  }
}

// ============================================
// 6. FUND ESCROW EXAMPLE (CLIENT)
// ============================================

import { contractAPI } from '../api/contractAPI';

async function fundEscrowExample(contractId) {
  try {
    const response = await contractAPI.fundEscrow(contractId);
    console.log('Escrow funded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error funding escrow:', error.response?.data);
    throw error;
  }
}

// ============================================
// 7. SUBMIT MILESTONE EXAMPLE (FREELANCER)
// ============================================

import { contractAPI } from '../api/contractAPI';

async function submitMilestoneExample(milestoneId, deliverables) {
  try {
    const response = await contractAPI.submitMilestone(milestoneId, deliverables);
    console.log('Milestone submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting milestone:', error.response?.data);
    throw error;
  }
}

// ============================================
// 8. APPROVE MILESTONE EXAMPLE (CLIENT)
// ============================================

import { contractAPI } from '../api/contractAPI';

async function approveMilestoneExample(milestoneId, feedback) {
  try {
    const response = await contractAPI.approveMilestone(milestoneId, feedback);
    console.log('Milestone approved, payment released:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error approving milestone:', error.response?.data);
    throw error;
  }
}

// ============================================
// 9. COMPLETE CONTRACT EXAMPLE (CLIENT)
// ============================================

import { contractAPI } from '../api/contractAPI';

async function completeContractExample(contractId, rating, review) {
  try {
    const response = await contractAPI.completeContract(contractId, rating, review);
    console.log('Contract completed:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completing contract:', error.response?.data);
    throw error;
  }
}

// ============================================
// 10. SUBMIT REVIEW EXAMPLE (FREELANCER)
// ============================================

import { contractAPI } from '../api/contractAPI';

async function submitReviewExample(contractId, rating, review) {
  try {
    const response = await contractAPI.submitReview(contractId, rating, review);
    console.log('Review submitted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error.response?.data);
    throw error;
  }
}

// ============================================
// 11. ERROR HANDLING PATTERN
// ============================================

async function apiCallWithErrorHandling(apiCall, errorContext) {
  try {
    const result = await apiCall();
    return { success: true, data: result.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    const statusCode = error.response?.status;

    // Handle specific error codes
    if (statusCode === 401) {
      // Token expired, redirect to login
      window.location.href = '/login';
    } else if (statusCode === 403) {
      // Access denied
      return { success: false, error: 'You do not have permission for this action' };
    } else if (statusCode === 404) {
      // Not found
      return { success: false, error: `${errorContext} not found` };
    } else if (statusCode === 400) {
      // Validation error
      return { success: false, error: errorMessage };
    } else if (statusCode === 500) {
      // Server error
      return { success: false, error: 'Server error. Please try again later.' };
    } else {
      // Network or other error
      return { success: false, error: `${errorContext} failed: ${errorMessage}` };
    }
  }
}

// Usage:
// const result = await apiCallWithErrorHandling(
//   () => jobAPI.getOpenJobs(),
//   'Loading jobs'
// );

// ============================================
// 12. USING WITH REDUX (if applicable)
// ============================================

import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

async function loginWithRedux(email, password) {
  const dispatch = useDispatch();

  try {
    const response = await authAPI.login({ email, password });

    // Store in localStorage
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify({
      email: response.data.email,
      // Add other user fields from backend
    }));

    // Update Redux store
    dispatch(setUser({
      email: response.data.email,
      // Add other user fields
    }));

    return response.data;
  } catch (error) {
    throw error;
  }
}

export {
  createJobExample,
  submitProposalExample,
  acceptProposalExample,
  fundEscrowExample,
  submitMilestoneExample,
  approveMilestoneExample,
  completeContractExample,
  submitReviewExample,
  apiCallWithErrorHandling,
  loginWithRedux
};
