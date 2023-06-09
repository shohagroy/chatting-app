import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import Avatar from "../Avatar";

export default function ChatItem({ lastMessage }) {
  const { createdAt, message, users } = lastMessage || {};

  const { user } = useSelector((state) => state.auth);
  const receivedBar = users?.find((el) => el.email !== user?.email);

  const currentTime = moment();
  const givenTime = moment(createdAt);

  const duration = moment.duration(currentTime.diff(givenTime));

  const minutes = parseInt(duration.asMinutes());
  const hours = parseInt(duration.asHours());
  const days = parseInt(duration.asDays());
  const weeks = parseInt(duration.asWeeks());
  const months = parseInt(duration.asMonths());

  let messageTime;

  if (minutes < 1) {
    messageTime = "now";
  } else if (minutes < 60) {
    messageTime = `${minutes}m`;
  } else if (hours < 24) {
    messageTime = `${hours}h`;
  } else if (days < 7) {
    messageTime = `${days}d`;
  } else if (weeks < 5) {
    messageTime = `${weeks}w`;
  } else if (months < 12) {
    messageTime = `${months}m`;
  } else {
    messageTime = null;
  }

  return (
    <Link
      className="flex items-center px-1 lg:px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none w-full"
      to={`/messages/${receivedBar?.email}`}
    >
      <Avatar user={receivedBar} />
      {/* {receivedBar?.avatar ? (
        <img
          src={receivedBar?.avatar}
          alt={receivedBar?.firstName}
          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
        />
      ) : (
        <p className="lg:w-14 w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
          {receivedBar?.firstName?.split("")[0]}
        </p>
      )} */}
      <div className="w-full pb-2 hidden md:block">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600 capitalize">
            {receivedBar?.firstName} {receivedBar?.lastName}
          </span>
          <span className="block ml-2 text-sm text-gray-600">
            {messageTime}
          </span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">{message}</span>
      </div>
    </Link>
  );
}
