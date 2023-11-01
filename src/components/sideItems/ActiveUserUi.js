import { Tooltip, List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";

const ActiveUserUi = ({ data }) => {
  return (
    <List>
      <VirtualList
        data={data}
        className="h-full lg:h-[700px]"
        itemHeight={80}
        itemKey="_id"
      >
        {(item) => (
          <List.Item key={item?._id}>
            <List.Item.Meta
              avatar={
                <Link to={"/dashboard"}>
                  <Avatar user={item} />
                </Link>
              }
              title={<Link to={"/dashboard"}>{item?.name}</Link>}
              description={item.email}
            />

            <Link to={"/dashboard"}>
              <Tooltip title={`send a message to ${item?.name.split(" ")[0]}`}>
                <div className="rotate-">
                  <SendOutlined />
                </div>
              </Tooltip>
            </Link>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default ActiveUserUi;
