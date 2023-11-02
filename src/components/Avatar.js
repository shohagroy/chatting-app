import React from "react";

const Avatar = ({ user, isActive }) => {
  const { photoURL = "", name = "demo" } = user || {};

  return photoURL ? (
    <div className="relative flex-shrink-0">
      {isActive && (
        <span
          className={`absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full dark:text-gray-100`}
        ></span>
      )}

      <img
        src={photoURL}
        alt={name}
        className="w-12 h-12 border rounded-full bg-gray-500 "
      />
    </div>
  ) : (
    <div className="relative flex-shrink-0">
      {isActive && (
        <span
          className={`absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full dark:text-gray-100`}
        ></span>
      )}

      <p className="w-12 h-12 border rounded-full bg-blue-500  text-white flex justify-center items-center  text-2xl uppercase font-serif">
        {name?.split("")[0]}
      </p>
    </div>
  );
};

export default Avatar;
