import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Spinner from './ui/Spinner.jsx';

/**
 * Protected route that requires admin access
 */
export default function AdminRoute({ children }) {
  const { user, usage, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check both usage and userData for admin status
  const isAdmin = usage?.isAdmin || userData?.isAdmin;
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

