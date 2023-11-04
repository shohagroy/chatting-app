import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
// import { useGetLoginUserQuery } from "./features/auth/authApi";
import router from "./routers/router";

function App() {
  // useGetLoginUserQuery();

  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
