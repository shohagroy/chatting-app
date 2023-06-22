import React from "react";

const NoConversation = () => {
  return (
    <div className="relative  w-full overflow-y-hiddeen h-[calc(85vh_-_64px)] flex flex-col items-center justify-center text-gray-700 space-y-5">
      <div>
        <img
          src={
            "https://img.freepik.com/free-vector/communication-logo-design-template_23-2149919615.jpg"
          }
          alt="Nothing here!"
          className="h-[200px]"
        />
      </div>
      <div className="text-center">
        No Conversations Found! Please Start yours Conversations!
      </div>
    </div>
  );
};

export default NoConversation;
