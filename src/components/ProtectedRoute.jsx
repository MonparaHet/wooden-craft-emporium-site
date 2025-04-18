
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Check if route requires admin access
  if (window.location.pathname === '/admin' && !isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
