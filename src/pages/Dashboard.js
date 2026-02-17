import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user || !user.role) {
    return <Navigate to="/login" />;
  }
  
  switch (user.role) {
    case 'ADMIN':
      return <Navigate to="/admin" />;
    case 'CLIENT':
      return <Navigate to="/client" />;
    case 'FREELANCER':
      return <Navigate to="/freelancer" />;
    default:
      return <Navigate to="/profile" />;
  }
};

export default Dashboard;