import { createBrowserRouter } from "react-router-dom";
import DemoTest from "../pages/demoTest/DemoTest";
import Inbox from "../pages/Inbox/Inbox";
import Conversation from "../pages/Conversation";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Signin from "../pages/signin/Signin";

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
    path: "/messages/:email",
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
  {
    path: "/sign-in",
    element: <Signin />,
  },
]);

export default router;
