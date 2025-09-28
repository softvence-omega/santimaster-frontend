import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { selectToken } from "../redux/features/auth/auth.slice";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    
 
  const token = useAppSelector(selectToken);

 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  return <>{children}</>;
};

export default ProtectedRoute;
