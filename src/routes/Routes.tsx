import { createBrowserRouter, useParams } from "react-router-dom";

import Mainlayout from "../Layout/Mainlayout";

import Home from "../pages/Home/Home";
import Mvp from "../pages/Mvp/Mvp";

import OpenGeneApplicationForm from "../Common/ApplicationFrom/ApplicationFrom";
import Donation from "../Common/Donation/Donation";
import SubmitProtocol from "../Common/SubmitProtocol/SubmitProtocol";
import UpdateProtocol from "../Common/UpdateProtocol/UpdateProtocol";
import ProtocolDeatils from "../components/Protocols/ProtocolDetails/ProtocolDeatils";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import UserDashboardLayout from "../Layout/UserDashboardLayou";
import NotFoundPage from "../pages/404/NotFound";
import AdminBlogs from "../pages/AdminDashboard/AdminBlogs/AdminBlogs";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import MessagesTable from "../pages/AdminDashboard/Message/Massage";
import AdminProtocols from "../pages/AdminDashboard/Protocols/AdminProtocols";
import ResearchFundingOverview from "../pages/AdminDashboard/ResearchFundingOverview/ResearchFundingOverview";
import ChangePassword from "../pages/Authentication/ChangePassword";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import LoginForm from "../pages/Authentication/Login";
import RegisterForm from "../pages/Authentication/Register";
import ResetPassword from "../pages/Authentication/RestPassword";
import Blog from "../pages/blog/Blog";
import BlogDetails from "../pages/blog/BlogDetails";
import Contact from "../pages/Contract/Contract";
import Protocols from "../pages/Protocols/Protocols";
import Roadmap from "../pages/Roadmap/Roadmap";
import RolesPage from "../pages/Roles/RolesPage";
import DraftProtocols from "../pages/UserDahsboard/DraftProtocols/DraftProtocols";
import ProfileSettings from "../pages/UserDahsboard/ProfileSettings/ProfileSettings";
import SubmittedProtocols from "../pages/UserDahsboard/SubmittedProtocols/SubmittedProtocols";
import UserDashboard from "../pages/UserDahsboard/userDashboard";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

// Wrapper component to extract id from URL params
// eslint-disable-next-line react-refresh/only-export-components
const ProtocolDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Protocol ID not found</div>;
  return <ProtocolDeatils id={id} />;
};

// Wrapper component for UpdateProtocol
// eslint-disable-next-line react-refresh/only-export-components
const UpdateProtocolWrapper = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Protocol ID not found</div>;
  return <UpdateProtocol protocolId={id} />;
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
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
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
        path: "/reset",
        element: <ResetPassword />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
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
        path: "update-protocol/:id",
        element: (
          <ProtectedRoute>
            <UpdateProtocolWrapper />
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
        element: <UserDashboard />,
      },
      {
        path: "overview",
        element: <UserDashboard />,
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
      {
        path: "research-funding-overview",
        element: <ResearchFundingOverview />,
      },
      {
        path: "protocols",
        element: <AdminProtocols />,
      },
      {
        path: "blogs",
        element: <AdminBlogs />,
      },
      {
        path: "messages",
        element: <MessagesTable />,
      },
    ],
  },
]);

export default router;
