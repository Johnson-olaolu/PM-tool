import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { authService } from "../services/auth.service";

const PrivateRoutes = () : JSX.Element => {
  // const isAuthenticated = authService.isAuthenticated()
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;