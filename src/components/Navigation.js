import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../features/auth/authSlice";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

export default function Navigation() {
  const [userMenu, setUserMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logOurHandelar = () => {
    dispatch(userLoggedOut());
  };

  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-gradient-to-r from-blue-600 to-blue-400 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <img className="h-10" src={""} alt="Logo." />
          </Link>

          <div className="flex items-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                <ul className="px-6 p-3">
                  <li className="text-white">
                    <p className="text-xl font-semibold">
                      Wellcome, {user?.firstName}
                    </p>
                  </li>
                </ul>

                <div className="relative ">
                  <button onClick={() => setUserMenu(!userMenu)}>
                    <div className="relative flex-shrink-0">
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-600 border rounded-full text-gray-100 border-gray-900"></span>
                      <img
                        src={
                          !user.avatar
                            ? "https://source.unsplash.com/50x50/?portrait"
                            : user?.avatar
                        }
                        alt={user?.firstName}
                        className="w-12 h-12 border rounded-full bg-gray-500 border-gray-700"
                      />
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
