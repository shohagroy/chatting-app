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
import { useDispatch, useSelector } from "react-redux";
import ListLoading from "../loading/ListLoading";
import { useEffect } from "react";
import { useLastConversationsQuery } from "../../features/conversation/conversationApi";
import { userLastConversations } from "../../features/conversation/conversationSlice";

const SideMenu = () => {
  const [current, setCurrent] = useState("messages");
  const [searchUser, setSearchUser] = useState("");
  const { user, activeUsers, allUsers } = useSelector((state) => state.user);
  const { lastConversations } = useSelector((state) => state.conversations);

  const { data: lastConversationsInfo, isLoading } = useLastConversationsQuery(
    user?.id
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLastConversations(lastConversationsInfo?.data));
  }, [lastConversationsInfo, dispatch]);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: (
        <Tooltip title="All Messages">
          <Badge
            count={
              lastConversations?.filter(
                (el) =>
                  el.isNotSeen && el?.participants.split("-")[0] !== user?.id
              ).length
            }
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
      className="shadow-md border"
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
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search..."
            prefix={<SearchOutlined />}
          />
        </>
      }
    >
      {!isLoading ? (
        current === "messages" ? (
          <div className="">
            <div className="hidden lg:block">
              <MessageUi
                height={600}
                user={user}
                isLoading={isLoading}
                conversations={lastConversations?.filter((el) =>
                  el?.users[1].name
                    ?.toLowerCase()
                    .includes(searchUser.toLowerCase())
                )}
              />
            </div>
            <div className="lg:hidden">
              <MessageUi
                height={530}
                user={user}
                isLoading={isLoading}
                conversations={lastConversations?.filter((el) =>
                  el?.users[1].name
                    ?.toLowerCase()
                    .includes(searchUser.toLowerCase())
                )}
              />
            </div>
          </div>
        ) : current === "users" ? (
          <div className="">
            <div className="hidden lg:block">
              <AllUserUi
                allUsers={allUsers?.filter((el) =>
                  el?.name?.toLowerCase().includes(searchUser.toLowerCase())
                )}
                height={600}
              />
            </div>
            <div className="lg:hidden">
              <AllUserUi
                allUsers={allUsers?.filter((el) =>
                  el?.name?.toLowerCase().includes(searchUser.toLowerCase())
                )}
                height={530}
              />
            </div>
          </div>
        ) : (
          <div className="">
            <div className="hidden lg:block">
              <ActiveUserUi
                height={600}
                data={activeUsers?.filter((el) =>
                  el?.name?.toLowerCase().includes(searchUser.toLowerCase())
                )}
              />
            </div>
            <div className="lg:hidden">
              <ActiveUserUi
                height={530}
                data={activeUsers?.filter((el) =>
                  el?.name?.toLowerCase().includes(searchUser.toLowerCase())
                )}
              />
            </div>
          </div>
        )
      ) : (
        <div>
          <div className="hidden lg:block">
            <ListLoading height={600} />
          </div>

          <div className="lg:hidden">
            <ListLoading height={530} />
          </div>
        </div>
      )}
    </Card>
  );
};

export default SideMenu;
