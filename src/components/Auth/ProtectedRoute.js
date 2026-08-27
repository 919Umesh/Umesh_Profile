import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, isBlogger, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="blog-status">Loading…</div>;
  }

  if (!user || !isBlogger) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
