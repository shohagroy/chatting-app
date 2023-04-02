import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userLoggedIn } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.token && auth?.user) {
        dispatch(
          userLoggedIn({
            token: auth.token,
            user: auth.user,
          })
        );
      }
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user?.email) {
    return <Navigate to="/login" state={{ path: location }} replace></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;
