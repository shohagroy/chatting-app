import { Input } from "antd";
import React from "react";

const FormInput = ({ icon, placeholder, name, type }) => {
  if (type === "password") {
    return (
      <Input
        size="large"
        placeholder={placeholder}
        name={name}
        required
        type={type}
        prefix={icon}
      />
    );
  } else {
    return (
      <Input
        size="large"
        placeholder={placeholder}
        name={name}
        required
        type={type}
        prefix={icon}
      />
    );
  }
};

export default FormInput;
