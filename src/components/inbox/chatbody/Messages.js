import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../../socket/socker.config";
import Message from "./Message";

export default function Messages({
  conversations,
  isLoading,
  isSuccess,
  isError,
}) {
  const { user } = useSelector((state) => state.auth);
  const [isTypeing, setIsTYpeing] = useState(false);

  const lastIndex = conversations?.length;
  const lastConversation = conversations && conversations[lastIndex - 1];
  const isSenderEmail = lastConversation?.participants.split("-")[0];

  useEffect(() => {
    socket.on("message", (data) => {
      setIsTYpeing(false);
    });

    socket.on("typing", (email) => {
      console.log(email);
      if (
        `${user?.email}-${email}` === lastConversation?.participants ||
        `${email}-${user?.email}` === lastConversation?.participants
      ) {
        setIsTYpeing(true);
      }
    });
  }, [user, lastConversation]);

  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">
        {conversations?.map((conversation) => {
          return (
            <Message
              conversation={conversation}
              key={conversation?.uniqId}
              position={true}
            />
          );
        })}

        <div className="flex justify-between text-blue-500 text-sm">
          <span>{isTypeing && "typing..."}</span>

          {isSenderEmail === user?.email && (
            <div className="flex justify-end text-blue-500 text-sm">
              <span>{isLoading && "sending..."}</span>
              <span>{isSuccess && "send"}</span>
              <span className="text-red-600">
                {isError && "something wrong"}
              </span>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}
