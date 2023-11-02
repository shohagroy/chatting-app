import { Button, Card, Flex, List, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SendOptions from "./SendOptions";
import { useSelector } from "react-redux";
import { useSendMessagesMutation } from "../../features/conversation/conversationApi";
import socket from "../../config/socket/socker.config";

const ConversationCard = ({ conversationId }) => {
  const { user, allUsers, conversations } = useSelector((state) => state.user);
  const [isTypeing, setIsTYpeing] = useState(false);

  const conversationUserQuery = `${user?.id}-${conversationId}`;
  const conversationPartnerQuery = `${conversationId}-${user?.id}`;

  const [sendMessages, { isLoading, isError }] = useSendMessagesMutation();

  const conversationsData = conversations?.filter(
    (conversation) =>
      conversation?.participants === conversationUserQuery ||
      conversation?.participants === conversationPartnerQuery
  );

  const conversationUser = allUsers?.find(
    (user) => user?.id === conversationId
  );

  useEffect(() => {
    socket.on("message", (data) => {
      setIsTYpeing(false);
    });

    socket.on("typing", (id) => {
      if (conversationId === id) {
        setIsTYpeing(true);
      }
    });
  }, [conversationUser, conversationId]);

  return (
    <div>
      <Card
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
        <List
          footer={
            <SendOptions
              sendMessages={sendMessages}
              conversationUser={conversationUser}
            />
          }
        >
          <div className="relative w-full h-[600px] py-6 px-3 overflow-y-auto flex flex-col-reverse">
            <ul className="space-y-2 overflow-ellipsis">
              {conversationsData.map((messageItem, index) => (
                <li
                  key={index}
                  className={`flex items-cetextblue-500nter ${
                    messageItem.participants === conversationUserQuery &&
                    "flex-row-reverse"
                  }`}
                >
                  {messageItem.participants === conversationPartnerQuery && (
                    <Avatar
                      user={messageItem?.users.find(
                        (user) => user?.id === conversationId
                      )}
                    />
                  )}

                  <div
                    className={`relative max-w-xl px-2 lg:px-4 py-1 lg:py-2 rounded shadow ${
                      messageItem.participants === conversationPartnerQuery &&
                      "ml-3"
                    } ${
                      messageItem.participants === conversationUserQuery
                        ? "bg-blue-500 text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="block">{messageItem.message}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* messahe box */}

          {/* conversation message  */}
          <div className="absolute -bottom-2 right-0">
            {isTypeing ? (
              <p className="text-[14px] text-blue-600">Typing</p>
            ) : isLoading ? (
              <p className="text-[14px] text-blue-600">Sending...</p>
            ) : isError ? (
              <p className="text-[14px] text-red-600">Something Wrong!</p>
            ) : (
              <p className="text-[14px] text-blue-600">Send</p>
            )}
          </div>
        </List>
      </Card>
    </div>
  );
};

export default ConversationCard;
