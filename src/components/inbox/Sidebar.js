import { useState } from "react";
import ActiveUsers from "./ActiveUsers";
import ChatItems from "./ChatIItems";

export default function Sidebar() {
  const [toggleContainer, setToggleContainer] = useState("message");
  return (
    <div className="lg:w-[700px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 border-b border-gray-300 flex justify-center">
        <button
          onClick={() => setToggleContainer("all_user")}
          className={`w-[50%] text-xl  font-bold duration-300 hover:bg-gray-100 block h-full ${
            toggleContainer === "all_user" && "bg-gray-200"
          }`}
        >
          All User
        </button>
        <button
          onClick={() => setToggleContainer("message")}
          className={`w-[50%] text-xl  font-bold duration-300 hover:bg-gray-100 block h-full ${
            toggleContainer === "message" && "bg-gray-200"
          }`}
        >
          Massage
        </button>
      </div>
      <div className="overflow-auto h-[calc(100vh_-_129px)]">
        {toggleContainer === "message" ? <ChatItems /> : <ActiveUsers />}
      </div>
    </div>
  );
}
