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
      messageItem?._id &&
      messageItem.participants === conversationPartnerQuery
    ) {
      console.log("user seend");
      socket.emit("seen", {
        room: "chatRoom1",
        id: messageItem._id,
      });
    }
  }, []);

  return (
    <li
      key={messageItem.id}
      className={`flex items-center   ${
        messageItem.participants === conversationUserQuery && "flex-row-reverse"
      }`}
    >
      {messageItem.participants === conversationPartnerQuery && (
        <Avatar
          user={messageItem?.users.find((user) => user?.id === conversationId)}
          isActive={false}
        />
      )}

      {/* ${
          messageItem.participants === conversationPartnerQuery && "ml-3"
        } ${
          messageItem.participants === conversationUserQuery
            ? "bg-[#00475D] text-white"
            : "text-gray-700"
        } */}

      <div
      //
      >
        {messageItem.participants === conversationUserQuery ? (
          <MyConversation messageItem={messageItem} />
        ) : (
          <UserConversation messageItem={messageItem} />
        )}
        {/* <span className="block">{messageItem.message}</span> */}
      </div>
    </li>
  );
};

export default ConversationItem;
