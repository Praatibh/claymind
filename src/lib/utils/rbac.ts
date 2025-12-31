/**
 * Role-Based Access Control (RBAC) Utilities
 * Centralized role checking for ClayMind
 */

import type { User } from '../types/api';

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: UserRole): boolean {
  if (!user) return false;
  // Assuming User type has an accountStatus that maps to role
  // Adjust based on your actual User type structure
  return (user as any).role === role;
}

/**
 * Check if user is an admin
 */
export function canAccessAdmin(user: User | null): boolean {
  return hasRole(user, 'admin');
}

/**
 * Check if user is a teacher
 */
export function canAccessTeacher(user: User | null): boolean {
  return hasRole(user, 'teacher') || canAccessAdmin(user);
}

/**
 * Check if user is a parent
 */
export function canAccessParent(user: User | null): boolean {
  return hasRole(user, 'parent') || canAccessAdmin(user);
}

/**
 * Check if user is a student
 */
export function canAccessStudent(user: User | null): boolean {
  return hasRole(user, 'student');
}

/**
 * Check if user can access dashboard
 */
export function canAccessDashboard(user: User | null): boolean {
  return user !== null && user.accountStatus === 'active';
}

/**
 * Check if user can access modules
 */
export function canAccessModules(user: User | null): boolean {
  return canAccessStudent(user) || canAccessTeacher(user) || canAccessAdmin(user);
}

/**
 * Check if user can access progress pages
 */
export function canAccessProgress(user: User | null): boolean {
  return user !== null && user.accountStatus === 'active';
}

/**
 * Check if user can view another user's data (for parents/teachers)
 */
export function canViewUserData(viewer: User | null, targetUserId: string): boolean {
  if (!viewer) return false;

  // Admin can view all
  if (canAccessAdmin(viewer)) return true;

  // Users can view their own data
  if (viewer.id === targetUserId) return true;

  // Parents and teachers would need additional checks
  // (checking parent_child_links or teacher_student_links tables)
  // This should be done server-side with RLS policies

  return false;
}

/**
 * Check if user can edit content
 */
export function canEditContent(user: User | null): boolean {
  return canAccessAdmin(user) || canAccessTeacher(user);
}

/**
 * Check if user can manage users
 */
export function canManageUsers(user: User | null): boolean {
  return canAccessAdmin(user);
}

/**
 * Get user's primary role
 */
export function getUserRole(user: User | null): UserRole | null {
  if (!user) return null;
  return (user as any).role || 'student';
}

/**
 * Get redirect path based on user role
 */
export function getDefaultRouteForRole(user: User | null): string {
  if (!user) return '/login';

  const role = getUserRole(user);

  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'teacher':
      return '/teacher/dashboard';
    case 'parent':
      return '/parent/dashboard';
    case 'student':
    default:
      return '/dashboard';
  }
}

/**
 * Check if email is verified (required for production)
 */
export function isEmailVerified(user: User | null): boolean {
  if (!user) return false;
  // This assumes your User type has email_verified_at field
  return !!(user as any).email_verified_at;
}

/**
 * Comprehensive access check
 */
export interface AccessCheckOptions {
  requireAuth?: boolean;
  requireRole?: UserRole | UserRole[];
  requireEmailVerified?: boolean;
  requireActiveStatus?: boolean;
}

export function checkAccess(
  user: User | null,
  options: AccessCheckOptions = {}
): { allowed: boolean; reason?: string } {
  const {
    requireAuth = true,
    requireRole,
    requireEmailVerified = false,
    requireActiveStatus = true,
  } = options;

  // Check authentication
  if (requireAuth && !user) {
    return { allowed: false, reason: 'Authentication required' };
  }

  // Check email verification
  if (requireEmailVerified && user && !isEmailVerified(user)) {
    return { allowed: false, reason: 'Email verification required' };
  }

  // Check active status
  if (requireActiveStatus && user && user.accountStatus !== 'active') {
    return { allowed: false, reason: 'Account is not active' };
  }

  // Check role
  if (requireRole && user) {
    const roles = Array.isArray(requireRole) ? requireRole : [requireRole];
    const userRole = getUserRole(user);

    if (!userRole || !roles.includes(userRole)) {
      return { allowed: false, reason: 'Insufficient permissions' };
    }
  }

  return { allowed: true };
}
