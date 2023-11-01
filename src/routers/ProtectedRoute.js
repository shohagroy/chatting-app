import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase/firebase.config";
import { useCreateUpdateUserMutation } from "../features/user/userApi";

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [createUpdateUser] = useCreateUpdateUserMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userInfo = {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
          };
          createUpdateUser(userInfo);
          setUser(userInfo);
          setIsLoading(false);
        } else {
          setUser({});
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [createUpdateUser, location]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Please Wait..
      </div>
    );
  }

  if (!user?.id) {
    return <Navigate to="/sign-in" state={{ path: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
