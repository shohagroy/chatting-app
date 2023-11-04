import { List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import getTimeDifference from "../../utils/calculatedTime";
import EmptyUI from "./EmptyUI";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const MessageUi = ({ user, height, isLoading, conversations }) => {
  const { typing } = useSelector((state) => state.user);
  if (isLoading) {
    return <EmptyUI height={height} />;
  }

  return conversations?.length ? (
    <List>
      <VirtualList
        data={conversations}
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
                  <Avatar
                    user={item?.users.find((el) => el?.id !== user?.id)}
                  />
                }
                title={
                  <p
                    className={`${
                      item?.isNotSeen &&
                      item?.participants.split("-")[0] !== user?.id &&
                      "font-bold"
                    }`}
                  >
                    {item?.users?.find((el) => el?.id !== user?.id)?.name}
                  </p>
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
                        Something Wrong! <CloseOutlined />
                      </p>
                    ) : (
                      <div>
                        {item?.participants.split("-")[0] === user?.id ? (
                          <div>
                            {typing ? (
                              <p className="text-sm text-blue-600">Typing...</p>
                            ) : item.createdAt ? (
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
