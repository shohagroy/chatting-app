import React from "react";
import Header from "../components/Header/Header";

import { useDispatch, useSelector } from "react-redux";

const NewLayout = () => {
  const { user, loading } = useSelector((state) => state.user);

  console.log(user, loading);
  return (
    <div>
      <main>
        <Header />
        <div>new dashboard</div>
      </main>
    </div>
  );
};

export default NewLayout;
