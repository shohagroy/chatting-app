import React from "react";

const UserConversation = ({ messageItem }) => {
  return (
    <div
      className={`relative bg-[#00475D] border max-w-[300px] lg:max-w-md px-2 lg:px-4 py-1 lg:py-2 rounded-e-xl rounded-tl-xl shadow-md ml-4`}
    >
      <div className="flex">
        <p className="text-lg text-white">{messageItem?.message}</p>
        <p className="ml-2 mt-3 text-sm text-gray-200">
          {new Date(messageItem?.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default UserConversation;
