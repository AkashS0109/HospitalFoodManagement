import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const protectedRoute = ({ element, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect if unauthorized
  }

  return element; // Render the component if authorized
};

export default protectedRoute;
