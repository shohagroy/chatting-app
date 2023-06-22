import { createBrowserRouter } from "react-router-dom";
import DemoTest from "../pages/demoTest/DemoTest";
import Inbox from "../pages/Inbox/Inbox";
import Conversation from "../pages/Conversation";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Conversation />
      </PrivateRoute>
    ),
  },
  {
    path: "/messages/:id",
    element: (
      <PrivateRoute>
        <Inbox />
      </PrivateRoute>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/demo",
    element: <DemoTest />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
