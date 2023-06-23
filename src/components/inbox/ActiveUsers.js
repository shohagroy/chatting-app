import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../features/user/userApi";

const ActiveUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetAllUserQuery(user?._id);

  return (
    <div>
      <ul>
        <li>
          {data?.data?.map((user) => {
            const { _id, avatar, firstName, lastName, email } = user || {};
            return (
              <Link
                key={_id}
                className="flex items-center px-1 lg:px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
                to={`/messages/${email}`}
              >
                <div className="relative flex-shrink-0">
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>
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
                <div className="w-full pb-2 hidden md:block">
                  <div className="flex justify-between">
                    <span className="block text-xl ml-3 font-bold text-gray-600 capitalize">
                      {firstName} {lastName}
                    </span>
                    <span className="block ml-2 text-sm text-gray-600">
                      {"Active"}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default ActiveUsers;
