import { createBrowserRouter } from "react-router-dom";
import Inbox from "../pages/Conversation";
import Login from "../pages/login/Login";
// import Login from "../pages/Login";
import Register from "../pages/Register";
import SignUp from "../pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/register",
    element: <SignUp />,
  },
]);

export default router;
