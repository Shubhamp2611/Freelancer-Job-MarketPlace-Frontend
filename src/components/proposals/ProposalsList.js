import axiosInstance from './axiosConfig';

export const proposalAPI = {
  // Submit proposal
  submitProposal: (data) => 
    axiosInstance.post('/proposals', data),
  
  // Get proposal by ID
  getProposalById: (proposalId) => 
    axiosInstance.get(`/proposals/${proposalId}`),
  
  // Get proposals for a job
  getProposalsForJob: (jobId) => 
    axiosInstance.get(`/proposals/job/${jobId}`),
  
  // Get my proposals (with error handling for missing endpoint)
  getMyProposals: async () => {
    try {
      const response = await axiosInstance.get('/proposals/my-proposals');
      return response;
    } catch (error) {
      if (error.response?.status === 403 || error.response?.status === 404) {
        // Endpoint doesn't exist or user doesn't have permission
        console.log('Proposals endpoint not available, returning empty array');
        return { data: [] };
      }
      throw error;
    }
  },
  
  // Accept proposal
  acceptProposal: (proposalId, message) => 
    axiosInstance.put(`/proposals/${proposalId}/accept`, null, {
      params: { message }
    }),
  
  // Reject proposal
  rejectProposal: (proposalId, message) => 
    axiosInstance.put(`/proposals/${proposalId}/reject`, null, {
      params: { message }
    }),
  
  // Withdraw proposal
  withdrawProposal: (proposalId) => 
    axiosInstance.put(`/proposals/${proposalId}/withdraw`),
};