/**
 * Protected Route Component
 * React Router integration for route-level protection
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { checkAccess, type AccessCheckOptions } from '../../lib/utils/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  options?: AccessCheckOptions;
  redirectTo?: string;
}

/**
 * ProtectedRoute - Protects entire routes from unauthorized access
 *
 * Usage in router configuration:
 *
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 *
 * With role requirement:
 * <Route
 *   path="/admin"
 *   element={
 *     <ProtectedRoute options={{ requireRole: 'admin' }}>
 *       <AdminPanel />
 *     </ProtectedRoute>
 *   }
 * />
 */
export function ProtectedRoute({
  children,
  options = { requireAuth: true },
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return <LoadingScreen />;
  }

  // Check access permissions
  const { allowed, reason } = checkAccess(user, options);

  if (!allowed) {
    // Redirect to login or unauthorized page
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location.pathname, reason }}
        replace
      />
    );
  }

  return <>{children}</>;
}

/**
 * Public Route - Redirects authenticated users away from auth pages
 */
interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({ children, redirectTo = '/dashboard' }: PublicRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // If user is already authenticated, redirect to dashboard
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}

/**
 * Admin Route - Shorthand for admin-only routes
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute
      options={{ requireRole: 'admin', requireEmailVerified: true }}
      redirectTo="/unauthorized"
    >
      {children}
    </ProtectedRoute>
  );
}

/**
 * Teacher Route - Shorthand for teacher-only routes
 */
export function TeacherRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute
      options={{ requireRole: 'teacher', requireEmailVerified: true }}
      redirectTo="/unauthorized"
    >
      {children}
    </ProtectedRoute>
  );
}

/**
 * Parent Route - Shorthand for parent-only routes
 */
export function ParentRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute
      options={{ requireRole: 'parent', requireEmailVerified: true }}
      redirectTo="/unauthorized"
    >
      {children}
    </ProtectedRoute>
  );
}

/**
 * Student Route - Shorthand for student routes
 */
export function StudentRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute
      options={{ requireRole: 'student', requireEmailVerified: false }}
    >
      {children}
    </ProtectedRoute>
  );
}

/**
 * Loading screen component
 */
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Checking permissions...</p>
      </div>
    </div>
  );
}
