import { List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import getTimeDifference from "../../utils/calculatedTime";
import EmptyUI from "./EmptyUI";
import { useGetLastUserConversationsQuery } from "../../features/conversation/conversationApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserConversations } from "../../features/user/userSlice";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const MessageUi = ({ user, height }) => {
  const { data, isLoading } = useGetLastUserConversationsQuery(user?.id);
  const dispatch = useDispatch();

  const { lastConversations } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      setUserConversations({
        userAllConversations: data?.data?.userConversations,
        lastConversations: data?.data?.lastConversations,
      })
    );
  }, [dispatch, data]);

  if (isLoading) {
    return <EmptyUI height={height} />;
  }

  return lastConversations?.length ? (
    <List>
      <VirtualList
        data={lastConversations}
        height={height}
        itemHeight={47}
        itemKey="item"
      >
        {(item) => (
          <List.Item key={item?.conversationId}>
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
                    className={`${
                      item?.isNotSeen &&
                      item?.participants.split("-")[0] !== user?.id &&
                      "font-bold"
                    }`}
                    to={`?conversation=${
                      item?.users?.find((el) => el?.id !== user?.id)?.id
                    }`}
                  >
                    {item?.users?.find((el) => el?.id !== user?.id)?.name}
                  </Link>
                }
                description={
                  <p
                    className={`${
                      item?.isNotSeen &&
                      item?.participants.split("-")[0] !== user?.id &&
                      "font-bold text-black"
                    }`}
                  >
                    {item?.message.length > 20
                      ? `${item?.message?.slice(0, 20)}...`
                      : item?.message}
                  </p>
                }
              />

              <div>
                <div className="flex justify-end items-end flex-col">
                  <p className="capitalize">
                    {getTimeDifference(item.createdAt)}
                  </p>

                  <div>
                    {item.isWrong ? (
                      <p className="text-[12px]  text-red-600 font-semibold">
                        Something Wrong!
                      </p>
                    ) : (
                      <div>
                        {item?.participants.split("-")[0] === user?.id ? (
                          <div>
                            {item.createdAt ? (
                              <div>
                                <CheckOutlined />{" "}
                                <span
                                  className={
                                    !item?.isNotSeen && "text-blue-600"
                                  }
                                >
                                  {item?.isNotSeen ? "Send" : "Seen"}
                                </span>
                              </div>
                            ) : (
                              <span className="text-blue-600">
                                <LoadingOutlined />
                              </span>
                            )}
                          </div>
                        ) : (
                          <div>
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
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* {item?.participants.split("-")[0] === user?.id ? (
                    <p className="text-[12px]">
                      {!item.isNotSeen ? "send" : "seen"}
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
                  )} */}
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
