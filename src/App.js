import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
// import { useGetLoginUserQuery } from "./features/auth/authApi";
import router from "./routers/router";
// import Background from "./assets/new.png";

function App() {
  // useGetLoginUserQuery();

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
