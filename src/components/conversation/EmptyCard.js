import { Card, Empty } from "antd";
import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <Card className="h-[800px] flex justify-center items-center">
      <Empty />
      <p className="text-center py-2 text-xl">
        {message || "Select a User to Start Conversation!"}
      </p>
    </Card>
  );
};

export default EmptyCard;
