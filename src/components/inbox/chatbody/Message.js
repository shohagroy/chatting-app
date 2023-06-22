import { useSelector } from "react-redux";

export default function Message({ conversation }) {
  const { message, users, participants } = conversation;

  const { user } = useSelector((state) => state.auth);
  const isSenderEmail = participants.split("-")[0];

  const sender = users?.find((el) => el._id === user?._id);
  const receivedBar = users?.find((el) => el.email === isSenderEmail);

  return (
    <li
      className={`flex items-center ${
        isSenderEmail === user?.email && "flex-row-reverse"
      }`}
    >
      <img
        className="object-cover w-10 h-10 rounded-full m-3"
        src={
          sender?.email === isSenderEmail ? sender?.avatar : receivedBar?.avatar
        }
        alt={
          sender?.email === isSenderEmail
            ? sender?.firstName
            : receivedBar?.firstName
        }
        title={
          sender?.email === isSenderEmail
            ? sender?.firstName
            : receivedBar?.firstName
        }
      />
      <div>
        <div
          className={`relative max-w-xl px-4 py-2 rounded shadow ${
            isSenderEmail === user?.email
              ? "bg-blue-500 text-white"
              : "text-gray-700"
          }`}
        >
          <span className="block">{message}</span>
        </div>
      </div>
    </li>
  );
}
