import { Button, Card, Flex, List, Tooltip } from "antd";
import React from "react";
import Avatar from "../Avatar";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import VirtualList from "rc-virtual-list";

const ConversationCard = () => {
  const data = [...Array(30)].map((_, i) => ({
    id: `kajsdhfksaf${i}`,
    name: "shohag",
    email: "shohag@.com",
    isActive: true,
  }));

  return (
    <div>
      <Card
        title={
          <Flex className="py-2" justify="space-between" align="center">
            <Flex justify="center" align="center">
              <Avatar user={{ name: "demo", isActive: false }} />
              <p className="text-xl ml-4 font-semibold">Shohag Roy</p>
            </Flex>

            <Tooltip title={"Close"}>
              <Button type="link" danger icon={<CloseOutlined />} />
            </Tooltip>
          </Flex>
        }
      >
        <List>
          <VirtualList
            data={data}
            className="h-full lg:h-[700px]"
            itemHeight={48}
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
              </List.Item>
            )}

            {/* {[...Array(10)].map((item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<Avatar user={"item"} />}
                  title={<Link to={"/dashboard"}>{"name"}</Link>}
                  description={"hello world"}
                />
              </List.Item>
            ))} */}
          </VirtualList>
        </List>
      </Card>
    </div>
  );
};

export default ConversationCard;
