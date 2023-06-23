import { useState } from "react";
import ActiveUsers from "./ActiveUsers";
import ChatItems from "./ChatIItems";
import { TiMessages } from "react-icons/ti";
import { FaUsers } from "react-icons/fa";

export default function Sidebar() {
  const [toggleContainer, setToggleContainer] = useState("message");
  return (
    <div className="lg:w-[700px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 border-b border-gray-300 flex justify-center">
        <button
          onClick={() => setToggleContainer("all_user")}
          className={`w-[50%] text-xl  font-bold duration-300 hover:bg-gray-100 h-full flex justify-center items-center ${
            toggleContainer === "all_user" && "bg-gray-200"
          }`}
        >
          <FaUsers className="block lg:hidden" />
          <span className="hidden lg:block"> All User</span>
        </button>
        <button
          onClick={() => setToggleContainer("message")}
          className={`w-[50%] text-xl  font-bold duration-300 hover:bg-gray-100  h-full flex justify-center items-center ${
            toggleContainer === "message" && "bg-gray-200"
          }`}
        >
          <TiMessages className="block lg:hidden" />
          <span className="hidden lg:block"> Massage</span>
        </button>
      </div>
      <div className="overflow-auto h-[calc(100vh_-_129px)]">
        {toggleContainer === "message" ? <ChatItems /> : <ActiveUsers />}
      </div>
    </div>
  );
}
