import { Button, Card, Flex, List, Tooltip } from "antd";
import React from "react";
import Avatar from "../Avatar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SendOptions from "./SendOptions";
import { useSelector } from "react-redux";

const ConversationCard = ({ conversationId }) => {
  const { allUsers } = useSelector((state) => state.user);

  const conversationUser = allUsers?.find(
    (user) => user?.id === conversationId
  );

  console.log(conversationUser);

  const messageData = [
    {
      isSenderEmail: "user1@example.com",
      receivedBar: {
        avatar: "user1-avatar.jpg",
        firstName: "User 1",
      },
      message: "Hello, how are you?",
    },
    {
      isSenderEmail: "user2@example.com",
      receivedBar: {
        avatar: "user2-avatar.jpg",
        firstName: "User 2",
      },
      message: "Im doing well, thanks!",
    },
  ];

  const user = {
    email: "your-email@example.com",
  };

  return (
    <div>
      <Card
        className=""
        title={
          <Flex className="py-2" justify="space-between" align="center">
            <Flex justify="center" align="center">
              <Avatar user={conversationUser} />
              <p className="text-xl ml-4 font-semibold">
                {conversationUser?.name}
              </p>
            </Flex>

            <Tooltip title={"Close"}>
              <Link to={"/dashboard"}>
                <Button type="link" danger icon={<CloseOutlined />} />
              </Link>
            </Tooltip>
          </Flex>
        }
      >
        <List footer={<SendOptions />}>
          <div className="relative w-full h-[600px] p-6 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2">
              {messageData.map((messageItem, index) => (
                <li
                  key={index}
                  className={`flex items-cetextblue-500nter ${
                    messageItem.isSenderEmail === user?.email &&
                    "flex-row-reverse"
                  }`}
                >
                  {messageItem.isSenderEmail !== user?.email && (
                    <div>
                      {messageItem.receivedBar?.avatar ? (
                        <img
                          className="object-cover w-10 h-10 rounded-full m-3"
                          src={messageItem.receivedBar?.avatar}
                          alt={messageItem.receivedBar?.firstName}
                          title={messageItem.receivedBar?.firstName}
                        />
                      ) : (
                        <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center text-2xl uppercase font-serif lg:mx-3">
                          {messageItem.receivedBar?.firstName?.split("")[0]}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <div
                      className={`relative max-w-xl px-2 lg:px-4 py-1 lg:py-2 rounded shadow ${
                        messageItem.isSenderEmail === user?.email
                          ? "bg-blue-500 text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="block">{messageItem.message}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* messahe box */}
        </List>
      </Card>
    </div>
  );
};

export default ConversationCard;
