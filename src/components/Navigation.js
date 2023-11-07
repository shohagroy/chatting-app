import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getActiveUser, userLoggedOut } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import socket from "../config/socket/socker.config";

export default function Navigation() {
  const [userMenu, setUserMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOurHandelar = () => {
    socket.emit("offline", user.id);
    dispatch(userLoggedOut());
  };

  useEffect(() => {
    socket.emit("join", user.id);

    socket.on("get-actives", (users) => {
      dispatch(getActiveUser(users));
    });
  }, [dispatch, user]);

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-gradient-to-r from-blue-600 to-blue-400 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <p className="text-2xl font-bold text-white mx-2">FreeChat</p>
          </Link>

          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                <ul className="px-6 p-3">
                  <li className="text-white">
                    <p className="text-xl hidden lg:block font-semibold capitalize">
                      Wellcome, {user?.firstName}
                    </p>
                  </li>
                </ul>

                <div className="relative ">
                  <button onClick={() => setUserMenu(!userMenu)}>
                    <div className="relative flex-shrink-0">
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>

                      {user?.avatar ? (
                        <img
                          src={user?.avatar}
                          alt={user?.firstName}
                          className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
                        />
                      ) : (
                        <p className="w-12 h-12 border rounded-full bg-blue-500 border-gray-700 text-white flex justify-center items-center  text-2xl uppercase font-serif">
                          {user?.firstName?.split("")[0]}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* user modal menu  */}
                  {userMenu && (
                    <div
                      className="absolute z-50 bottom-100 rounded-lg shadow-lg -right-0
               text-gray-600 text-sm font-semibold  bg-white w-[150px]"
                    >
                      <button
                        onClick={logOurHandelar}
                        className="w-full rounded-lg  flex font-sm p-3 duration-300 hover:bg-red-600 items-center hover:text-white"
                      >
                        <AiOutlineLogout className="mr-2" />
                        <span className="">Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
