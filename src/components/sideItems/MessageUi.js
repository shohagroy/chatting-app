import { Tooltip, List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";

const MessageUi = ({ user, conversations }) => {
  // const findLastConversations = (conversations, loginUser) => {
  //   const lastConversationsMap = new Map();
  //   for (const conversation of conversations) {
  //     const participants = conversation.participants.split("-");

  //     if (participants.includes(loginUser.id)) {
  //       const otherUserId = participants.find(
  //         (userId) => userId !== loginUser.id
  //       );

  //       if (lastConversationsMap.has(otherUserId)) {
  //         const lastConversation = lastConversationsMap.get(otherUserId);
  //         if (
  //           new Date(conversation.createdAt) >
  //           new Date(lastConversation.createdAt)
  //         ) {
  //           lastConversationsMap.set(otherUserId, conversation);
  //         }
  //       } else {
  //         lastConversationsMap.set(otherUserId, conversation);
  //       }
  //     }
  //   }

  //   const lastConversations = Array.from(lastConversationsMap.values());
  //   return lastConversations;
  // };

  // const lastConversations = findLastConversations(conversations, user);

  return (
    <List>
      <VirtualList
        data={conversations}
        className="h-full lg:h-[700px]"
        itemHeight={48}
        itemKey="_id"
      >
        {(item) => (
          <List.Item key={item?._id}>
            <List.Item.Meta
              avatar={
                <Link to={``}>
                  <Avatar user={item?.users.find((el) => el.id !== user.id)} />
                </Link>
              }
              title={
                <Link
                  to={`?conversation=${
                    item?.users.find((el) => el.id !== user.id).id
                  }`}
                >
                  {item?.users.find((el) => el.id !== user.id).name}
                </Link>
              }
              description={item?.message}
            />

            <Link to={`?conversation=${item?.id}`}>
              <Tooltip title={`send a message to ${"hello"}`}>
                <div className="rotate-">
                  <SendOutlined />
                </div>
              </Tooltip>
            </Link>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default MessageUi;
