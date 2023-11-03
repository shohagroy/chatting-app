import React, { useEffect } from "react";
import Header from "../components/Header/Header";

import { Flex } from "antd";
import SideMenu from "../components/sideItems/SideMenu";
import { Outlet, useLocation } from "react-router-dom";
import socket from "../config/socket/socker.config";
import { useDispatch, useSelector } from "react-redux";
import { userActiveStatus } from "../features/user/userSlice";

const MainLayout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const conversationId = queryParams.get("conversation");

  useEffect(() => {
    socket.emit("join", user);
    socket.on("get-actives", (usersData) => {
      const activeUsers = usersData.map((info) => {
        return info.user.id;
      });

      dispatch(userActiveStatus(activeUsers));
    });
  }, [user, dispatch]);

  return (
    <div>
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
              <div className={`absolute  lg:hidden top-[8vh] left-0 w-full`}>
                <Outlet />
              </div>
            )}
          </Flex>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
