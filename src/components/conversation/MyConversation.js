import React from "react";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const MyConversation = ({ messageItem }) => {
  return (
    <div
      className={`relative bg-white text-gray-600 border max-w-[300px] lg:max-w-md px-2 lg:px-4 py-1 lg:py-2 rounded-s-xl rounded-tr-xl shadow-md ml-4`}
    >
      {!messageItem.isWrong ? (
        <div className="flex justify-end items-end">
          <p className="text-lg">{messageItem?.message}</p>
          <div>
            {messageItem?.createdAt ? (
              <p className="ml-2 w-[75px] text-right mt-3 text-sm text-gray-400">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                <span
                  className={`ml-2 ${
                    !messageItem?.isNotSeen ? "text-blue-600" : ""
                  }`}
                >
                  <CheckOutlined />
                </span>
              </p>
            ) : (
              <p className="ml-2 mt-3 text-sm text-gray-400">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                <span className="ml-2 text-blue-600">
                  <LoadingOutlined />
                </span>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex">
          <p className="text-lg">{messageItem?.message}</p>
          <div className="">
            <p className="ml-2 mt-3 text-sm font-semibold text-red-600">
              Wrong!
              <span className={`ml-2`}>
                <CloseOutlined />
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConversation;
