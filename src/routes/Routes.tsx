import { createBrowserRouter, useParams } from "react-router-dom";

import Mainlayout from "../Layout/Mainlayout";

import Home from "../pages/Home/Home";
import Mvp from "../pages/Mvp/Mvp";

import OpenGeneApplicationForm from "../Common/ApplicationFrom/ApplicationFrom";
import Donation from "../Common/Donation/Donation";
import SubmitProtocol from "../Common/SubmitProtocol/SubmitProtocol";
import ProtocolDeatils from "../components/Protocols/ProtocolDetails/ProtocolDeatils";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import UserDashboardLayout from "../Layout/UserDashboardLayou";
import NotFoundPage from "../pages/404/NotFound";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import LoginForm from "../pages/Authentication/Login";
import RegisterForm from "../pages/Authentication/Register";
import Contact from "../pages/Contract/Contract";
import Protocols from "../pages/Protocols/Protocols";
import Roadmap from "../pages/Roadmap/Roadmap";
import RolesPage from "../pages/Roles/RolesPage";
import DraftProtocols from "../pages/UserDahsboard/DraftProtocols/DraftProtocols";
import ProfileSettings from "../pages/UserDahsboard/ProfileSettings/ProfileSettings";
import ReviewQueue from "../pages/UserDahsboard/ReviewQueue/ReviewQueue";
import SubmittedProtocols from "../pages/UserDahsboard/SubmittedProtocols/SubmittedProtocols";
import UserDashboard from "../pages/UserDahsboard/userDashboard";
import UserDashboardOverview from "../pages/UserDahsboard/UserDashboardOverview/UserDashboardOverview";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Wrapper component to extract id from URL params
// eslint-disable-next-line react-refresh/only-export-components
const ProtocolDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Protocol ID not found</div>;
  return <ProtocolDeatils id={id} />;
};

const router = createBrowserRouter([
  //   -------------main layout------------------
  {
    path: "/",
    element: <Mainlayout />,
    errorElement: <NotFoundPage />,
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
        path: "/protocol/:id",
        element: <ProtocolDetails />,
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
        element: <SubmittedProtocols published={[]} />,
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
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
