import React from "react";
import Avatar from "../Avatar";
import { useEffect } from "react";
import socket from "../../config/socket/socker.config";
import MyConversation from "./MyConversation";
import UserConversation from "./UserConversation";

const ConversationItem = ({
  messageItem,
  conversationUserQuery,
  conversationPartnerQuery,
  conversationId,
}) => {
  useEffect(() => {
    if (
      messageItem?.isNotSeen &&
      messageItem.participants === conversationPartnerQuery
    ) {
      socket.emit("seen", {
        room: "chatRoom1",
        id: messageItem?._id,
      });
    }
  }, [messageItem, conversationPartnerQuery]);

  return (
    <li
      className={`flex items-center ${
        messageItem.participants === conversationUserQuery
          ? "flex-row-reverse"
          : ""
      }`}
    >
      {messageItem.participants === conversationPartnerQuery && (
        <Avatar
          user={messageItem?.users.find((user) => user?.id === conversationId)}
          isActive={false}
        />
      )}

      <div>
        {messageItem.participants === conversationUserQuery ? (
          <MyConversation messageItem={messageItem} />
        ) : (
          <UserConversation messageItem={messageItem} />
        )}
      </div>
    </li>
  );
};

export default ConversationItem;
