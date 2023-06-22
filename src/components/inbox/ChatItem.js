import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ChatItem({ lastMessage }) {
  const { createdAt, message, users } = lastMessage || {};

  const { user } = useSelector((state) => state.auth);

  const receivedBar = users?.find((el) => el.email !== user?.email);

  return (
    <Link
      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none w-full"
      to={`/messages/${receivedBar?.email}`}
    >
      {receivedBar?.avatar ? (
        <img
          src={receivedBar?.avatar}
          alt={receivedBar?.firstName}
          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
        />
      ) : (
        <p className="w-14 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
          {receivedBar?.firstName?.split("")[0]}
        </p>
      )}
      <div className="w-full pb-2 hidden md:block">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600 capitalize">
            {receivedBar?.firstName} {receivedBar?.lastName}
          </span>
          <span className="block ml-2 text-sm text-gray-600">{createdAt}</span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">{message}</span>
      </div>
    </Link>
  );
}
