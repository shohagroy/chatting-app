import React from "react";
import { useSelector } from "react-redux";

const Avatar = ({ user }) => {
  const { avatar, firstName } = user || {};

  const { activeUsers } = useSelector((state) => state.auth);

  return (
    <div className="relative flex-shrink-0">
      {activeUsers.find((el) => el.userId === user?._id) && (
        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>
      )}

      {avatar ? (
        <img
          src={avatar}
          alt={firstName}
          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
        />
      ) : (
        <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
          {firstName?.split("")[0]}
        </p>
      )}
    </div>
  );
};

export default Avatar;
