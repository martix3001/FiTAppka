// src/layouts/AuthLayout.tsx

import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../../../contexts/auth/useAuth";

const AuthLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
};

export default AuthLayout;
