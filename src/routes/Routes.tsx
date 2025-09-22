import { createBrowserRouter } from "react-router-dom";

import Mainlayout from "../Layout/Mainlayout";
import PartnerDashboardLayout from "../Layout/UserDashboardLayou";
import Home from "../pages/Home/Home";
import Mvp from "../pages/Mvp/Mvp";

import Protocols from "../pages/Protocols/Protocols";
import LoginForm from "../pages/Authentication/Login";
import RegisterForm from "../pages/Authentication/Register";
import Contact from "../pages/Contract/Contract";
import ProtocolDeatils from "../components/Protocols/ProtocolDetails/ProtocolDeatils";
import Roadmap from "../pages/Roadmap/Roadmap";
import RolesPage from "../pages/Roles/RolesPage";
import OpenGeneApplicationForm from "../Common/ApplicationFrom/ApplicationFrom";
import SubmitProtocol from "../Common/SubmitProtocol/SubmitProtocol";
import Donation from "../Common/Donation/Donation";

const router = createBrowserRouter([
  //   -------------main layout------------------
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/mvp",
        element: <Mvp />,
      },
      {
        path: "/protocol",
        element: <Protocols />,
      },
      {
        path: "/protocol-details",
        element: <ProtocolDeatils />,
      },

      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/contract",
        element: <Contact />,
      },
      {
        path: "/roadmap",
        element: <Roadmap />,
      },
      {
        path: "/roles",
        element: <RolesPage />,
      },
      {
        path: "/gene-application",
        element: <OpenGeneApplicationForm />,
      },
      {
        path: "/submit-potocol",
        element: <SubmitProtocol />,
      },
      {
        path: "/donation",
        element: <Donation />,
      },
    ],
  },

  {
    path: "/user-dashboard",
    element: <PartnerDashboardLayout />,
    children: [],
  },

  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default router;
