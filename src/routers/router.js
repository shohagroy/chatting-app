import { createBrowserRouter } from "react-router-dom";
// import DemoTest from "../pages/demoTest/DemoTest";
// import Inbox from "../pages/Inbox/Inbox";
// import Conversation from "../pages/Conversation";
import Login from "../pages/login/Login";
// import SignUp from "../pages/signup/Signup";
// import PrivateRoute from "./PrivateRoute";
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
]);

export default router;
