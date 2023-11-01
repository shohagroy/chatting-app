import { List, Tooltip } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";

const AllUserUi = ({ data }) => {
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
                <Link to={`/dashboard?conversation=${item?.id}`}>
                  <Avatar user={item} />
                </Link>
              }
              title={
                <Link to={`/dashboard?conversation=${item?.id}`}>
                  {item?.name}
                </Link>
              }
              description={item.email}
            />

            <Link to={`/dashboard?conversation=${item?.id}`}>
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

export default AllUserUi;
