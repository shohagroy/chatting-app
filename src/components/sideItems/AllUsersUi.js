import { List, Tooltip } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import EmptyUI from "./EmptyUI";

const AllUserUi = ({ allUsers, height }) => {
  return allUsers?.length ? (
    <List>
      <VirtualList
        data={allUsers}
        height={height}
        itemHeight={47}
        itemKey="item"
      >
        {(item) => (
          <List.Item key={item?.id}>
            <Link
              className="w-full flex items-center"
              to={`?conversation=${item?.id}`}
            >
              <List.Item.Meta
                avatar={<Avatar user={item} isActive={item?.isActive} />}
                title={item?.name}
                description={item.email}
              />

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
  ) : (
    <EmptyUI height={height} message={"No Users Found"} />
  );
};

export default AllUserUi;
