import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: React.ReactNode;
  isLoggedIn: boolean;
}

const ProtectedRoute = ({ isLoggedIn, element }: ProtectedRouteProps) => {
  return isLoggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
