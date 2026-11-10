import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const GuestRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default ProtectedRoute;