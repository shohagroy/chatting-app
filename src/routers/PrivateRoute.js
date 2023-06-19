import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetLoginUserQuery } from "../features/auth/authApi";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { data, isLoading, isError, isSuccess, error } = useGetLoginUserQuery();

  console.log(data, isLoading, isError, isSuccess, error);

  // useEffect(() => {
  //   setLoading(true);
  //   const localAuth = localStorage?.getItem("auth");

  //   if (localAuth) {
  //     const auth = JSON.parse(localAuth);
  //     if (auth?.token && auth?.user) {
  //       dispatch(
  //         userLoggedIn({
  //           token: auth.token,
  //           user: auth.user,
  //         })
  //       );
  //     }
  //   }
  //   setLoading(false);
  // }, [dispatch]);

  if (isLoading && !data?.data?._id) {
    return <h2>Loading...</h2>;
  }

  if (!data?.data?.email) {
    return <Navigate to="/login" state={{ path: location }} replace></Navigate>;
  } else {
    return children;
  }
};

export default PrivateRoute;
