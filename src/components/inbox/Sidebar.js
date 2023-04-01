import ChatItems from "./ChatIItems";

export default function Sidebar() {
  return (
    <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 border-b border-gray-300 flex justify-center">
        <button className="w-[50%] text-xl font-bold duration-300 hover:bg-gray-200 block h-full">
          Avtive
        </button>
        <button className="w-[50%] text-xl font-bold duration-300 hover:bg-gray-200 block h-full">
          Massage
        </button>
      </div>
      <div className="overflow-auto h-[calc(100vh_-_129px)]">
        <ChatItems />
      </div>
      {/* <Blank /> */}
    </div>
  );
}
