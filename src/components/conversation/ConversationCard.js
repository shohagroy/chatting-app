import { Button, Card, Flex, List, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SendOptions from "./SendOptions";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessagesMutation } from "../../features/conversation/conversationApi";
import socket from "../../config/socket/socker.config";
import { setLastConversations } from "../../features/user/userSlice";
import EmptyCard from "./EmptyCard";

const ConversationCard = ({ conversationId }) => {
  const { user, allUsers, conversations } = useSelector((state) => state.user);
  const [isTypeing, setIsTYpeing] = useState(false);

  const dispatch = useDispatch();

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
      const partnarId = data?.conversations?.participants?.split("-")[1];
      if (partnarId === user?.id) {
        setIsTYpeing(false);
        dispatch(setLastConversations(data?.conversations));
      }
    });

    socket.on("typing", (id) => {
      if (conversationId === id) {
        setIsTYpeing(true);
      }
    });
  }, [conversationUser, conversationId, user, dispatch]);

  return (
    <Card
      title={
        <Flex className="py-2" justify="space-between" align="center">
          <Flex justify="center" align="center">
            <Avatar
              user={conversationUser}
              isActive={conversationUser?.isActive}
            />
            <p className="text-xl ml-4 font-semibold">
              {conversationUser?.name}
            </p>
          </Flex>

          <Tooltip title={"Close"}>
            <Link to={"/"}>
              <Button type="link" danger icon={<CloseOutlined />} />
            </Link>
          </Tooltip>
        </Flex>
      }
    >
      <List
        className=""
        footer={
          <SendOptions
            sendMessages={sendMessages}
            conversationUser={conversationUser}
          />
        }
      >
        <div className="relative w-full h-[600px] pb-3 lg:py-6 lg:px-3 overflow-y-auto flex flex-col-reverse">
          {conversationsData?.length ? (
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
                      isActive={false}
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
          ) : (
            <EmptyCard message={"Start new conversation!"} border={false} />
          )}
        </div>

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
  );
};

export default ConversationCard;
