import { createBrowserRouter } from "react-router-dom";

import Mainlayout from "../Layout/Mainlayout";

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
import UserDashboardLayout from "../Layout/UserDashboardLayou";
import UserDashboard from "../pages/UserDahsboard/userDashboard";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboardOverview from "../pages/UserDahsboard/UserDashboardOverview/UserDashboardOverview";
import DraftProtocols from "../pages/UserDahsboard/DraftProtocols/DraftProtocols";
import SubmittedProtocols from "../pages/UserDahsboard/SubmittedProtocols/SubmittedProtocols";
import ReviewQueue from "../pages/UserDahsboard/ReviewQueue/ReviewQueue";
import ProfileSettings from "../pages/UserDahsboard/ProfileSettings/ProfileSettings";

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
        element: (
          <ProtectedRoute>
            <OpenGeneApplicationForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/submit-protocol",
        element: (
          <ProtectedRoute>
            <SubmitProtocol />
          </ProtectedRoute>
        ),
      },
      {
        path: "/donation",
        element: <Donation />,
      },
    ],
  },

  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "overview",
        element: <UserDashboardOverview />,
      },
      {
        path: "my-drafts",
        element: <DraftProtocols />,
      },
      {
        path: "submitted",
        element: <SubmittedProtocols />,
      },
      {
        path: "review-queue",
        element: <ReviewQueue />,
      },
      {
        path: "settings",
        element: <ProfileSettings />,
      },
    ],
  },
  // ----------admin dashboard-------------
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },

  {
    path: "*",
  },
]);

export default router;
