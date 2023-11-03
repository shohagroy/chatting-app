import { Badge, Card, Input, Menu, Tooltip } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import {
  UsergroupAddOutlined,
  MessageOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import MessageUi from "./MessageUi";
import AllUserUi from "./AllUsersUi";
import ActiveUserUi from "./ActiveUserUi";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const [current, setCurrent] = useState("messages");

  const { user, allUsers, activeUsers, lastConversations } = useSelector(
    (state) => state.user
  );

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <Tooltip title="All Messages">
          <Badge
            count={lastConversations?.filter((el) => el.isNotSeen).length}
            offset={[10, -5]}
          >
            <button
              className={
                current === "messages"
                  ? "font-semibold lg:font-bold"
                  : "lg:font-semibold text-black"
              }
            >
              <MessageOutlined /> <span>Messages</span>
            </button>
          </Badge>
        </Tooltip>
      ),
      key: "messages",
    },

    {
      label: (
        <Tooltip title="Active Users">
          <Badge count={activeUsers?.length} offset={[10, -5]}>
            <button
              className={
                current === "active"
                  ? "font-semibold lg:font-bold"
                  : "lg:font-semibold text-black"
              }
            >
              <UserSwitchOutlined /> <span>Active</span>
            </button>
          </Badge>
        </Tooltip>
      ),
      key: "active",
    },
    {
      label: (
        <Tooltip title="All Users">
          <button
            className={`justify-center items-start ${
              current === "users"
                ? "font-semibold lg:font-bold"
                : "lg:font-semibold text-black"
            }`}
          >
            <UsergroupAddOutlined />
            <span>Users</span>
          </button>
        </Tooltip>
      ),
      key: "users",
    },
  ];

  return (
    <Card
      title={
        <>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="w-full my-3"
          />
          <Input
            className="mb-2"
            placeholder="Search..."
            prefix={<SearchOutlined />}
          />
        </>
      }
    >
      {current === "messages" ? (
        <MessageUi user={user} conversations={lastConversations} />
      ) : current === "users" ? (
        <div className="">
          <div className="hidden lg:block">
            <AllUserUi data={allUsers} height={600} />
          </div>
          <div className="lg:hidden">
            <AllUserUi data={allUsers} height={530} />
          </div>
        </div>
      ) : (
        <ActiveUserUi data={activeUsers} />
      )}
    </Card>
  );
};

export default SideMenu;
