import { createBrowserRouter } from "react-router-dom";
import DemoTest from "../pages/demoTest/DemoTest";
import Inbox from "../pages/Inbox/Inbox";
// import Conversation from "../pages/Conversation";
import Login from "../pages/login/Login";
// import SignUp from "../pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Signin from "../pages/signin/Signin";
import Register from "../pages/register/Register";
import NewLayout from "../layout/NewLayout";
import ProtectedRoute from "./ProtectedRoute";
import Conversation from "../pages/Conversation/Conversation";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <PrivateRoute>
  //       <Conversation />
  //     </PrivateRoute>
  //   ),
  // },
  // {
  //   path: "/messages/:email",
  //   element: (
  //     <PrivateRoute>
  //       <Inbox />
  //     </PrivateRoute>
  //   ),
  // },

  {
    path: "/login",
    element: <Login />,
  },

  // {
  //   path: "/demo",
  //   element: <DemoTest />,
  // },
  // {
  //   path: "/register",
  //   element: <SignUp />,
  // },
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <NewLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Conversation />,
      },
    ],
  },
]);

export default router;
