/**
 * Authentication Service (Supabase)
 * Handles user authentication with Supabase Auth and database management
 */

import { supabase, getUserProfile, getUserProgress } from '../supabase';
import { errorLoggingService } from './error-logging.service';
import type { User } from '../types/api';
import type { AuthError, User as SupabaseUser } from '@supabase/supabase-js';

export interface SignupData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  age?: number;
  parentEmail?: string;
  role?: 'student' | 'parent' | 'teacher';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  accessToken?: string;
  refreshToken?: string;
}

export class AuthService {
  /**
   * Convert Supabase user + profile to app User type
   */
  private async mapToAppUser(supabaseUser: SupabaseUser): Promise<User> {
    const profile = await getUserProfile(supabaseUser.id);
    const progress = await getUserProgress(supabaseUser.id).catch(() => null);

    return {
      id: profile.id,
      firstName: profile.first_name,
      lastName: profile.last_name || undefined,
      email: profile.email,
      age: profile.age || undefined,
      level: progress?.current_level || 1,
      avatarUrl: profile.avatar_url || `/avatars/default-${(profile.age || 1) % 5 + 1}.png`,
      accountStatus: profile.account_status,
      username: profile.username || undefined,
      displayName: profile.display_name || profile.first_name,
      joinedDate: new Date(profile.created_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      }),
      role: profile.role,
      emailVerifiedAt: profile.email_verified_at || undefined,
      onboardingCompletedAt: profile.onboarding_completed_at || undefined,
      bio: profile.bio || undefined,
    };
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password strength
   */
  private isValidPassword(password: string): { valid: boolean; error?: string } {
    if (password.length < 8) {
      return { valid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one lowercase letter' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: 'Password must contain at least one uppercase letter' };
    }
    if (!/\d/.test(password)) {
      return { valid: false, error: 'Password must contain at least one number' };
    }
    return { valid: true };
  }

  /**
   * Signup new user
   */
  async signup(data: SignupData): Promise<AuthResult> {
    try {
      // Validate email
      if (!this.isValidEmail(data.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Validate password
      const passwordValidation = this.isValidPassword(data.password);
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.error };
      }

      // Validate age if provided
      if (data.age !== undefined && (data.age < 6 || data.age > 18)) {
        return { success: false, error: 'Age must be between 6 and 18' };
      }

      // Sign up with Supabase Auth
      const { data: authData, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            age: data.age,
            role: data.role || 'student',
          },
        },
      });

      if (signupError) {
        return {
          success: false,
          error: signupError.message || 'Signup failed'
        };
      }

      if (!authData.user) {
        return {
          success: false,
          error: 'Signup failed - no user returned'
        };
      }

      // Update profile with additional data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName || null,
          display_name: data.firstName,
          username: `${data.firstName.toLowerCase()}_${Math.floor(Math.random() * 10000)}`,
          role: data.role || 'student',
          age: data.age || null,
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
      }

      // Map to app user type
      const user = await this.mapToAppUser(authData.user);

      errorLoggingService.addBreadcrumb({
        category: 'auth',
        message: 'User signup successful',
        level: 'info',
        data: { email: data.email },
      });

      return {
        success: true,
        user,
        accessToken: authData.session?.access_token,
        refreshToken: authData.session?.refresh_token,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AuthService',
          action: 'signup',
        }
      );
      return {
        success: false,
        error: 'An error occurred during signup. Please try again.',
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      // Validate email
      if (!this.isValidEmail(credentials.email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return {
          success: false,
          error: 'Invalid email or password'
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Login failed - no user returned'
        };
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', data.user.id);

      // Map to app user type
      const user = await this.mapToAppUser(data.user);

      errorLoggingService.addBreadcrumb({
        category: 'auth',
        message: 'User login successful',
        level: 'info',
        data: { email: credentials.email },
      });

      return {
        success: true,
        user,
        accessToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AuthService',
          action: 'login',
        }
      );
      return {
        success: false,
        error: 'An error occurred during login. Please try again.',
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await supabase.auth.signOut();

      errorLoggingService.addBreadcrumb({
        category: 'auth',
        message: 'User logout',
        level: 'info',
      });
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AuthService',
          action: 'logout',
        }
      );
    }
  }

  /**
   * Get current user from Supabase session
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return null;

      return await this.mapToAppUser(user);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
  }

  /**
   * Get current access token
   */
  async getAccessToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle(): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message || 'Google Sign In failed',
        };
      }

      // Note: OAuth redirects, so this returns immediately
      return {
        success: true,
      };
    } catch (error) {
      errorLoggingService.logError(
        error instanceof Error ? error : new Error(String(error)),
        {
          component: 'AuthService',
          action: 'signInWithGoogle',
        }
      );
      return {
        success: false,
        error: 'Google Sign In failed. Please try again.',
      };
    }
  }

  /**
   * Reset password request
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Password reset request failed. Please try again.',
      };
    }
  }

  /**
   * Update password
   */
  async updatePassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const passwordValidation = this.isValidPassword(newPassword);
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.error };
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Password update failed. Please try again.',
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
