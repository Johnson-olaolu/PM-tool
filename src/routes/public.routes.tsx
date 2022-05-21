import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { authService } from "../services/auth.service";

const PublicRoutes = () : JSX.Element => {
  // const isAuthenticated = authService.isAuthenticated()
  const isAuthenticated = false
  return !isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PublicRoutes;