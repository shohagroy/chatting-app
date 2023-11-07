import React, { useEffect } from "react";
import Header from "../components/Header/Header";

import { Flex } from "antd";
import SideMenu from "../components/sideItems/SideMenu";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { useGetAllUserQuery } from "../features/user/userApi";
import { getAllUsers } from "../features/user/userSlice";

const MainLayout = () => {
  const { user, activeUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conversationId = queryParams.get("conversation");

  const { data: userData, isLoading: userLoading } = useGetAllUserQuery(
    user.id
  );

  useEffect(() => {
    if (userData?.data.length) {
      const newUsers = activeUsers.filter(
        (user) => !userData.data.find((el) => el.id === user?.id)
      );

      const updatedData = userData.data.map((el) => {
        if (activeUsers.find((active) => active.id === el.id)) {
          return {
            ...el,
            isActive: true,
          };
        } else {
          return el;
        }
      });
      dispatch(getAllUsers([...updatedData, ...newUsers]));
    }
  }, [dispatch, activeUsers, userLoading, userData]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chat App</title>
      </Helmet>

      <main>
        <Header />
        <div className="max-w-7xl lg:my-4 mx-auto overflow-hidden">
          <Flex justify="center" align="center">
            <div className="w-full lg:w-[550px]">
              <SideMenu />
            </div>

            <div className={`hidden lg:block ml-4 w-full h-full `}>
              <Outlet />
            </div>

            {conversationId && (
              <div className={`absolute  lg:hidden top-[7.5vh] left-0 w-full`}>
                <Outlet />
              </div>
            )}
          </Flex>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
