import axiosInstance from './axiosConfig';

export const profileAPI = {
  getProfile: () => 
    axiosInstance.get('/profile/me'),
  
  updateProfile: (data) => 
    axiosInstance.put('/profile', data),
  
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post('/profile/picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getFreelancers: (params) => 
    axiosInstance.get('/profile/freelancers', { params }),
  
  getClients: (params) => 
    axiosInstance.get('/profile/clients', { params }),
};