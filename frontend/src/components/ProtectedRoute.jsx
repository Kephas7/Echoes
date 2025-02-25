import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children (protected component)
  return children;
};

export default ProtectedRoute;