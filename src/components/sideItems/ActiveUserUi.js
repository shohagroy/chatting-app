import { Tooltip, List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import Avatar from "../Avatar";
import EmptyUI from "./EmptyUI";

const ActiveUserUi = ({ data, height }) => {
  // console.log(data);

  return data?.length ? (
    <List>
      <VirtualList data={data} height={height} itemHeight={47} itemKey="item">
        {(item) => (
          <List.Item key={item?.id}>
            <Link
              className="flex items-center w-full"
              to={`?conversation=${item?.id}`}
            >
              <List.Item.Meta
                avatar={<Avatar user={item} isActive={item?.isActive} />}
                title={item?.name}
                description={item.email}
              />

              <Tooltip title={`send a message to ${item?.name?.split(" ")[0]}`}>
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
    <EmptyUI height={height} message="No Active Users Found" />
  );
};

export default ActiveUserUi;
