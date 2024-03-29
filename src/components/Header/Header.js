import React from "react";
import Avatar from "../Avatar";
import { Button, Dropdown, Image } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { userLogOut } from "../../config/firebase/auth.provaider";
// import { useCreateUpdateUserMutation } from "../../features/user/userApi";
import socket from "../../config/socket/socker.config";
import Logo from "../../assets/logo-white.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  // const [createUpdateUser] = useCreateUpdateUserMutation();

  const userSignOutHandelar = async () => {
    await userLogOut();
    socket.emit("offline", user.id);
  };

  const items = [
    // {
    //   key: "1",
    //   label: (
    //     <Link href="/">
    //       <Button
    //         icon={<UserOutlined />}
    //         type="link"
    //         style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
    //       >
    //         Profile
    //       </Button>
    //     </Link>
    //   ),
    // },

    {
      key: "5",
      label: (
        <Button
          onClick={userSignOutHandelar}
          type="link"
          danger
          icon={<LogoutOutlined />}
          style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
        >
          Log Out
        </Button>
      ),
    },
  ];
  return (
    <div className="bg-[#00475D] py-3 z-50 h-[8vh]">
      <div className="max-w-7xl mx-auto flex h-full justify-between items-center px-2">
        <div>
          <Link to={"/"}>
            <Image width={100} src={Logo} />
          </Link>
          {/* <p className="text-2xl font-bold text-white">Chat-App</p> */}
        </div>

        <div className="flex justify-center items-center">
          <p className="text-white px-2 capitalize text-xl font-semibold">
            {user?.name?.split(" ")[0]}
          </p>
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <button>
              <Avatar user={user} isActive={user?.isActive} />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
