import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../../services/userService";

const ProtectedRoute = () => {
  const location = useLocation();
  //   console.log(location);
  return getUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
