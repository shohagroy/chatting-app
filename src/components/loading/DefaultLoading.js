import React from "react";
import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DefaultLoading = () => {
  return (
    <Row className="flex-col justify-center items-center">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 50,
            }}
          />
        }
      ></Spin>
      <p className="p-3 text-xl font-semibold">Loading...</p>
    </Row>
  );
};

export default DefaultLoading;
