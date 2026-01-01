import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const loginTime = localStorage.getItem("loginTime");
  
  // Check if session has expired (12 hours = 43200000 milliseconds)
  const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours
  const isSessionValid = loginTime && 
    (Date.now() - parseInt(loginTime)) < SESSION_DURATION;

  if (!isAuthenticated || !isSessionValid) {
    // Clear invalid session
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
