import { Empty } from "antd";
import React from "react";

const EmptyUI = ({ height, message }) => {
  return (
    <div
      className={`h-[${height}px] w-full flex-col flex justify-center items-center`}
    >
      <Empty description={false} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <p className="text-center py-2">{message}</p>
    </div>
  );
};

export default EmptyUI;
