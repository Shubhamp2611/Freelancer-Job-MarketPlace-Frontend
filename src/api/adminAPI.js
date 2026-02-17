import axiosInstance from './axiosConfig';

export const adminAPI = {
  getDashboardStats: () => 
    axiosInstance.get('/admin/dashboard'),
  
  getFinancialReport: () => 
    axiosInstance.get('/admin/financials'),
  
  getUsers: () => 
    axiosInstance.get('/admin/users'),
};