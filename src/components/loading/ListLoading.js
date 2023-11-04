import { List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";

const ListLoading = ({ height }) => {
  const data = [...Array(10)].map((_, i) => i + 1);

  return (
    <List>
      <VirtualList data={data} height={height} itemHeight={47} itemKey="item">
        {(item) => (
          <List.Item key={item}>
            <div className="w-full animate-pulse">
              <List.Item.Meta
                avatar={
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200"></div>
                }
                title={
                  <div className=" mt-4 w-1/2 h-5 rounded bg-gray-200"></div>
                }
                description={
                  <div className="w-full h-3 rounded bg-gray-200"></div>
                }
              />
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default ListLoading;
