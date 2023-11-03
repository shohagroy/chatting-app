import { Card, Empty } from "antd";
import React from "react";
import DefaultLoading from "../loading/DefaultLoading";
import { useSelector } from "react-redux";

const EmptyCard = ({ message, border = true }) => {
  const { loading } = useSelector((state) => state.user);

  return (
    <Card
      className={`h-[755px] flex justify-center items-center ${
        !border && "border-none"
      }`}
    >
      {loading ? (
        <DefaultLoading />
      ) : (
        <div>
          <Empty />
          <p className="text-center py-2 text-xl">
            {message || "Select a User to Start Conversation!"}
          </p>
        </div>
      )}
    </Card>
  );
};

export default EmptyCard;
