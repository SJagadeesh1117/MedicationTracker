import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedKey }) => {
  const id = localStorage.getItem(allowedKey);
  
  if (!id) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children;
};

export default ProtectedRoute;
