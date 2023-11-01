import React from "react";
import Avatar from "../Avatar";
import { Button, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLogOut } from "../../config/firebase/auth.provaider";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  const userSignOutHandelar = async () => {
    const result = await userLogOut();

    console.log(result);
  };

  const items = [
    {
      key: "1",
      label: (
        <Link href="/">
          <Button
            icon={<UserOutlined />}
            type="link"
            style={{ width: "100%", margin: "0px 0", textAlign: "left" }}
          >
            Profile
          </Button>
        </Link>
      ),
    },

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
    <div className="bg-[#00475D] h-[7vh]">
      <div className="max-w-7xl mx-auto flex h-full justify-between items-center px-2">
        <div>
          <p className="text-2xl font-bold text-white">Chat-App</p>
        </div>

        <div className="flex justify-center items-center">
          <p className="text-white px-2 text-xl font-semibold">
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
              <Avatar user={user} />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
