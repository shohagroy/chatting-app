import { List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import getTimeDifference from "../../utils/calculatedTime";
import EmptyUI from "./EmptyUI";
import { useGetLastUserConversationsQuery } from "../../features/conversation/conversationApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserConversations } from "../../features/user/userSlice";

const MessageUi = ({ user, height }) => {
  const { data, isLoading } = useGetLastUserConversationsQuery(user?.id);
  const dispatch = useDispatch();

  const lastConversations = data?.data?.lastConversations;
  const userAllConversations = data?.data?.userConversations;

  useEffect(() => {
    dispatch(setUserConversations({ userAllConversations, lastConversations }));
  }, [dispatch, userAllConversations, lastConversations]);

  if (isLoading) {
    return <EmptyUI height={height} />;
  }

  return lastConversations?.length ? (
    <List>
      <VirtualList
        data={lastConversations}
        height={height}
        itemHeight={47}
        itemKey="_id"
      >
        {(item) => (
          <List.Item key={item?._id}>
            <Link
              className="flex items-center w-full"
              to={`?conversation=${
                item?.users.find((el) => el?.id !== user?.id)?.id
              }`}
            >
              <List.Item.Meta
                avatar={
                  <Link
                    to={`?conversation=${
                      item?.users.find((el) => el?.id !== user.id)?.id
                    }`}
                  >
                    <Avatar
                      user={item?.users.find((el) => el?.id !== user?.id)}
                    />
                  </Link>
                }
                title={
                  <Link
                    className={`${item?.isNotSeen && "font-bold"}`}
                    to={`?conversation=${
                      item?.users?.find((el) => el?.id !== user?.id)?.id
                    }`}
                  >
                    {item?.users?.find((el) => el?.id !== user?.id)?.name}
                  </Link>
                }
                description={
                  <p className={`${item?.isNotSeen && "font-bold text-black"}`}>
                    {item?.message.length > 20
                      ? `${item?.message?.slice(0, 20)}...`
                      : item?.message}
                  </p>
                }
              />

              <div>
                <div className="flex justify-end items-end flex-col">
                  <p>{getTimeDifference(item.createdAt)}</p>
                  {item?.participants.split("-")[0] === user?.id ? (
                    <p className="text-[12px]">
                      {/* {!item.isNotSeen ? "send" : "seen"} */}
                      Send
                    </p>
                  ) : (
                    <p className="text-[12px]">
                      {item.isNotSeen
                        ? "new"
                        : new Date(item?.createdAt).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      </VirtualList>
    </List>
  ) : (
    <EmptyUI height={height} message={"No Conversations Found!"} />
  );
};

export default MessageUi;
