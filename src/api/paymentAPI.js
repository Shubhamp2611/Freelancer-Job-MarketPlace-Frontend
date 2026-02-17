import axiosInstance from './axiosConfig';

export const paymentAPI = {
  // Create escrow payment
  createEscrowPayment: (contractId, clientId) => 
    axiosInstance.post(`/payments/escrow/${contractId}`, null, {
      params: { clientId }
    }),
  
  // Release milestone payment
  releaseMilestone: (contractId, milestoneId, clientId) => 
    axiosInstance.post(`/payments/release/${contractId}`, null, {
      params: { milestoneId, clientId }
    }),
  
  // Get payment history
  getPaymentHistory: (userId) => 
    axiosInstance.get(`/payments/history/${userId}`),
  
  // Withdraw earnings
  withdrawEarnings: (freelancerId, amount) => 
    axiosInstance.post(`/payments/withdraw/${freelancerId}`, null, {
      params: { amount }
    }),
};