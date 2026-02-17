// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Get auth state from Redux
  const { user, isAuthenticated } = useSelector(state => state.auth || {});
  
  // Add fallback for token in localStorage
  const token = localStorage.getItem('token');
  const isAuth = isAuthenticated || !!token;
  
  if (!isAuth && !token) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0) {
    // Get user from localStorage as fallback
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user?.role || storedUser?.role;
    
    if (userRole && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }
  }
  
  return children;
};

export default ProtectedRoute;