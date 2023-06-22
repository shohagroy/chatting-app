import { useSelector } from "react-redux";
import Message from "./Message";

export default function Messages({ conversations, isLoading }) {
  const { user } = useSelector((state) => state.auth);

  const lastIndex = conversations?.length;
  const lastConversation = conversations && conversations[lastIndex - 1];

  const isSenderEmail = lastConversation?.participants.split("-")[0];

  return (
    <div className="relative w-full h-[calc(100vh_-_197px)] p-6 overflow-y-auto flex flex-col-reverse">
      <ul className="space-y-2">
        {conversations?.map((conversation) => {
          return (
            <Message
              conversation={conversation}
              key={conversation?._id}
              position={true}
              message={"gknkjnlk.mlml"}
            />
          );
        })}

        {isSenderEmail === user?.email && (
          <div className="flex justify-end text-blue-500 text-sm">
            <span>{isLoading ? "sending..." : "send"}</span>
          </div>
        )}
      </ul>
    </div>
  );
}
