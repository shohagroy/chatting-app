import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../config/socket/socker.config";
import { Button, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";

const SendOptions = ({ conversationUser, sendMessages }) => {
  const { user } = useSelector((state) => state.user);
  const [textMessage, setTextMessages] = useState("");

  const participantsId = `${user.id}-${conversationUser?.id}`;

  useEffect(() => {
    if (textMessage) {
      socket.emit("typing", {
        room: "chatRoom1",
        participants: participantsId,
      });
    }
  }, [textMessage, participantsId]);

  const id = uuidv4();

  const conversations = {
    conversationId: id,
    participants: participantsId,
    users: [user, conversationUser],
    message: textMessage,
    isNotSeen: true,
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();

    sendMessages(conversations);
    setTextMessages("");
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="flex items-center justify-between w-full p-3 border-t border-gray-300"
    >
      <Input
        onChange={(e) => setTextMessages(e.target.value)}
        value={textMessage}
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring  rounded-full focus:text-gray-700"
        name="message"
        required
      />

      <div className=" transform duration-300 hover:-rotate-[30deg]">
        <Button htmlType="submit" icon={<SendOutlined />} type="link" />
      </div>
    </form>
  );
};

export default SendOptions;
