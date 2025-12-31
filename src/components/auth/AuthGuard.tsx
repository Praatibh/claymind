/**
 * Auth Guard Component
 * Protects routes and components from unauthorized access
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../lib/services/auth.service';
import { checkAccess, type AccessCheckOptions } from '../../lib/utils/rbac';
import type { User } from '../../lib/types/api';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  options?: AccessCheckOptions;
}

/**
 * AuthGuard - Protects components from unauthorized access
 *
 * Usage:
 * <AuthGuard>
 *   <ProtectedComponent />
 * </AuthGuard>
 *
 * With role requirement:
 * <AuthGuard options={{ requireRole: 'admin' }}>
 *   <AdminPanel />
 * </AuthGuard>
 */
export function AuthGuard({
  children,
  fallback = <LoadingScreen />,
  redirectTo = '/login',
  options = {},
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      const { allowed, reason } = checkAccess(currentUser, options);

      if (!allowed) {
        console.warn('Access denied:', reason);
        navigate(redirectTo, {
          replace: true,
          state: { from: window.location.pathname, reason }
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate(redirectTo, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <>{fallback}</>;
  }

  const { allowed } = checkAccess(user, options);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Loading screen component
 */
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Unauthorized screen component
 */
export function UnauthorizedScreen({ message = 'You do not have permission to access this page' }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-md p-8">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
