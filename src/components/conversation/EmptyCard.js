import { Card, Empty } from "antd";
import React from "react";

const EmptyCard = ({ message, border = true }) => {
  return (
    <Card
      className={`h-[700px] lg:h-[800px] flex justify-center items-center ${
        !border && "border-none"
      }`}
    >
      <Empty />
      <p className="text-center py-2 text-xl">
        {message || "Select a User to Start Conversation!"}
      </p>
    </Card>
  );
};

export default EmptyCard;
