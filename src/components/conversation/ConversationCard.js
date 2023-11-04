import { Button, Flex, List, Tooltip } from "antd";
import React, { useEffect } from "react";
import Avatar from "../Avatar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SendOptions from "./SendOptions";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessagesMutation } from "../../features/conversation/conversationApi";
import socket from "../../config/socket/socker.config";
import EmptyCard from "./EmptyCard";
import ConversationItem from "./ConversationItem";
import { setTyping } from "../../features/user/userSlice";
import Background from "../../assets/new.png";

const ConversationCard = ({ conversationId }) => {
  const { user, allUsers, conversations, typing } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const conversationUserQuery = `${user?.id}-${conversationId}`;
  const conversationPartnerQuery = `${conversationId}-${user?.id}`;

  const [sendMessages] = useSendMessagesMutation();

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
        dispatch(setTyping(false));
      }
    });

    socket.on("typing", (id) => {
      if (conversationPartnerQuery === id) {
        dispatch(setTyping(true));
      } else {
        dispatch(setTyping(false));
      }
    });
  }, [conversationPartnerQuery, user, dispatch]);

  return (
    <List
      className="lg:border bg-white lg:shadow-md lg:rounded-md "
      header={
        <Flex
          className=" m-0 px-3 lg:px-6 "
          justify="space-between"
          align="center"
        >
          <div className={conversationUser ? "" : "animate-pulse"}>
            <Flex justify="center" align="center">
              {conversationUser ? (
                <Avatar
                  user={conversationUser}
                  isActive={conversationUser?.isActive}
                />
              ) : (
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200"></div>
              )}

              {conversationUser ? (
                <p className="text-xl capitalize ml-4 font-semibold">
                  {conversationUser?.name}
                </p>
              ) : (
                <div className=" mt-4 w-1/2 h-5 rounded bg-gray-200"></div>
              )}
            </Flex>
          </div>

          <Tooltip title={"Close"}>
            <Link to={"/"}>
              <Button type="link" danger icon={<CloseOutlined />} />
            </Link>
          </Tooltip>
        </Flex>
      }
      footer={
        <SendOptions
          sendMessages={sendMessages}
          conversationUser={conversationUser}
        />
      }
    >
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="relative w-full h-[600px] lg:h-[575px] overflow-y-auto flex flex-col-reverse"
      >
        {conversationsData?.length ? (
          <ul className="space-y-2 overflow-ellipsis p-3 lg:px-6">
            {conversationsData.map((messageItem) => (
              <ConversationItem
                key={messageItem?.conversationId}
                messageItem={messageItem}
                conversationUserQuery={conversationUserQuery}
                conversationPartnerQuery={conversationPartnerQuery}
                conversationId={conversationId}
              />
            ))}
          </ul>
        ) : (
          <EmptyCard message={"Start new conversation!"} border={false} />
        )}
      </div>

      <div className="h-4">
        {typing && <p className="text-sm text-blue-600">Typing...</p>}
      </div>
    </List>
  );
};

export default ConversationCard;
