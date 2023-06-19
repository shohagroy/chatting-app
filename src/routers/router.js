import { createBrowserRouter } from "react-router-dom";
import DemoTest from "../pages/demoTest/DemoTest";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DemoTest />
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
