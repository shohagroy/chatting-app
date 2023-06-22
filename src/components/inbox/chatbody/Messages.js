import Message from "./Message";

export default function Messages({ conversations }) {
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
      </ul>
    </div>
  );
}
