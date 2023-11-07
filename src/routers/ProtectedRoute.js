import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase/firebase.config";
import { useCreateUpdateUserMutation } from "../features/user/userApi";

import { Navigate, useLocation } from "react-router-dom";
import DefaultLoading from "../components/loading/DefaultLoading";
import socket from "../config/socket/socker.config";
import { useDispatch } from "react-redux";
import {
  getActiveUsers,
  getUsersInfo,
  loginInUser,
} from "../features/user/userSlice";

const ProtectedRoute = ({ children }) => {
  const [createUpdateUser] = useCreateUpdateUserMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();

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

          dispatch(getUsersInfo(userInfo));
          socket.on("get-actives", (users) => {
            const activeUsers = users.filter(
              (user) => user?.id !== userInfo?.id
            );

            dispatch(getActiveUsers(activeUsers));
          });
          if (userInfo.name) {
            socket.emit("join", userInfo);
          }
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
  }, [createUpdateUser, location, dispatch]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        <DefaultLoading />
      </div>
    );
  }

  if (!user?.id) {
    return <Navigate to="/login" state={{ path: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
