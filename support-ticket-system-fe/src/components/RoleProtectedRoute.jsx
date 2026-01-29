import { Navigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';

const RoleProtectedRoute = ({ children, requirePermission }) => {
  const permissions = usePermissions();

  // Check if user has required permission
  const hasPermission = requirePermission ? requirePermission(permissions) : true;

  if (!hasPermission) {
    // Redirect to tickets page if no permission
    return <Navigate to="/tickets" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
