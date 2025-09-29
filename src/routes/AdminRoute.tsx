import { Navigate } from "react-router-dom";

import { useAppSelector } from "../redux/hook";
import { selectToken, selectUser } from "../redux/features/auth/auth.slice";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser); 

  // Not logged in → send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not ADMIN → send to unauthorized
  if (user?.role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
