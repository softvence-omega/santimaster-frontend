import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Mainlayout from "../Layout/Mainlayout";
import PartnerDashboardLayout from "../Layout/DashboardLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [],
  },

  //   -------------main layout------------------
  {
    path: "/",
    element: <Mainlayout />,
    children: [{ path: "/", element: <Home /> }],
  },

  {
    path: "/partner-dashboard",
    element: <PartnerDashboardLayout />,
    children: [],
  },

  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default router;
