import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/signin/Signin";
import Register from "../pages/register/Register";
import ProtectedRoute from "./ProtectedRoute";
import Conversation from "../pages/Conversation/Conversation";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Conversation />,
      },
    ],
  },

  {
    path: "/login",
    element: <Signin />,
  },

  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
