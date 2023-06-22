import { useSelector } from "react-redux";

export default function Message({ conversation }) {
  const { message, users, participants } = conversation;

  const { user } = useSelector((state) => state.auth);
  const isSenderEmail = participants.split("-")[0];

  //   const sender = users?.find((el) => el._id === user?._id);
  const receivedBar = users?.find((el) => el.email === isSenderEmail);

  return (
    <li
      className={`flex items-center ${
        isSenderEmail === user?.email && "flex-row-reverse"
      }`}
    >
      {/* {avatar ? (
        <img
          src={avatar}
          alt={firstName}
          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
        />
      ) : (
        <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
          {firstName?.split("")[0]}
        </p>
      )} */}

      {isSenderEmail !== user?.email && (
        <div>
          {receivedBar?.avatar ? (
            <img
              className="object-cover w-10 h-10 rounded-full m-3"
              src={receivedBar?.avatar}
              alt={receivedBar?.firstName}
              title={receivedBar?.firstName}
            />
          ) : (
            <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif mx-3">
              {receivedBar?.firstName?.split("")[0]}
            </p>
          )}
        </div>
      )}

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
