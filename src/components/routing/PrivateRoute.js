import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSso } from "../../sso/sso/SsoProvider";

export const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const { authenticated } = useSso();
  return !authenticated ? (
    <Navigate to={redirectTo} replace />
  ) : children ? (
    children
  ) : (
    <Outlet />
  );
};
