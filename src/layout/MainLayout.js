import React from "react";
import Header from "../components/Header/Header";

import { Flex } from "antd";
import SideMenu from "../components/sideItems/SideMenu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <main>
        <Header />

        <div className="max-w-7xl lg:my-4 mx-auto overflow-hidden">
          <Flex justify="center" align="center">
            <div className="w-[550px]">
              <SideMenu />
            </div>
            <div className="ml-4 w-full hidden lg:block ">
              <Outlet />
            </div>
          </Flex>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
