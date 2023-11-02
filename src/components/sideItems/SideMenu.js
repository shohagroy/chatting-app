import { Card, Menu, Tooltip } from "antd";
import React, { useState } from "react";

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
        <Tooltip title="All Users">
          <button
            className={
              current === "users"
                ? "font-semibold lg:font-bold"
                : "lg:font-semibold text-black"
            }
          >
            <UsergroupAddOutlined /> <span>Users</span>
          </button>
        </Tooltip>
      ),
      key: "users",
    },
    {
      label: (
        <Tooltip title="All Messages">
          <button
            className={
              current === "messages"
                ? "font-semibold lg:font-bold"
                : "lg:font-semibold text-black"
            }
          >
            <MessageOutlined /> <span>Messages</span>
          </button>
        </Tooltip>
      ),
      key: "messages",
    },

    {
      label: (
        <Tooltip title="Active Users">
          <button
            className={
              current === "active"
                ? "font-semibold lg:font-bold"
                : "lg:font-semibold text-black"
            }
          >
            <UserSwitchOutlined /> <span>Active</span>
          </button>
        </Tooltip>
      ),
      key: "active",
    },
  ];

  return (
    <div>
      <Card
        title={
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        }
      >
        {current === "messages" ? (
          <MessageUi user={user} conversations={lastConversations} />
        ) : current === "users" ? (
          <AllUserUi data={allUsers} />
        ) : (
          <ActiveUserUi data={activeUsers} />
        )}
      </Card>
    </div>
  );
};

export default SideMenu;
