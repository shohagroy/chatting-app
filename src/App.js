import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { useGetLoginUserQuery } from "./features/auth/authApi";
import router from "./routers/router";

function App() {
  const { data, isLoading, isError, isSuccess, error } = useGetLoginUserQuery();

  console.log(data, isLoading, isError, isSuccess, error);
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
