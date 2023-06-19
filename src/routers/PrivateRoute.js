import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
    }
  }, [isLoading]);

  if (showLoading) {
    return <h2>Loading...</h2>;
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{ path: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
