import { Tooltip, List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";

const ActiveUserUi = ({ data, height }) => {
  return (
    <List>
      <VirtualList data={data} height={height} itemHeight={47} itemKey="_id">
        {(item) => (
          <List.Item key={item?._id}>
            <List.Item.Meta
              avatar={
                <Link to={`?conversation=${item?.id}`}>
                  <Avatar user={item} isActive={item?.isActive} />
                </Link>
              }
              title={<Link to={`?conversation=${item?.id}`}>{item?.name}</Link>}
              description={item.email}
            />

            <Link to={`?conversation=${item?.id}`}>
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
