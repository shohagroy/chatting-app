import { List } from "antd";
import React, { useEffect } from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import getTimeDifference from "../../utils/calculatedTime";
import socket from "../../config/socket/socker.config";
import { useDispatch } from "react-redux";
import { sendLastConversation } from "../../features/user/userSlice";

const MessageUi = ({ user, conversations, height }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("unseen", (data) => {
      if (data?.participants.split("-")[1] === user.id) {
        dispatch(sendLastConversation(data));
      }
    });
  }, [user, dispatch]);

  return (
    <List>
      <VirtualList
        data={conversations}
        height={height}
        itemHeight={47}
        itemKey="_id"
      >
        {(item) => (
          <List.Item key={item?._id}>
            <List.Item.Meta
              avatar={
                <Link
                  to={`?conversation=${
                    item?.users.find((el) => el.id !== user.id).id
                  }`}
                >
                  <Avatar user={item?.users.find((el) => el.id !== user.id)} />
                </Link>
              }
              title={
                <Link
                  className={`${item?.isNotSeen && "font-bold"}`}
                  to={`?conversation=${
                    item?.users?.find((el) => el?.id !== user?.id).id
                  }`}
                >
                  {item?.users?.find((el) => el?.id !== user?.id).name}
                </Link>
              }
              description={
                <p className={`${item?.isNotSeen && "font-bold text-black"}`}>
                  {item?.message}
                </p>
              }
            />

            <div>
              <div className="flex justify-end items-end flex-col">
                <p>{getTimeDifference(item.createdAt)}</p>
                {item?.participants.split("-")[0] === user.id ? (
                  <p className="text-[12px]">
                    {/* {!item.isNotSeen ? "send" : "seen"} */}
                    Send
                  </p>
                ) : (
                  <p className="text-[12px]">
                    {item.isNotSeen
                      ? "new"
                      : new Date(item?.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                  </p>
                )}
              </div>
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default MessageUi;
