/**
 * Authentication Context
 * Provides authentication state and methods throughout the application
 */

import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService } from '../lib/services/auth.service';
import { errorLoggingService } from '../lib/services/error-logging.service';
import type { User, LoginRequest, SignupRequest } from '../lib/types/api';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check authentication status on mount
   */
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.checkAuth();
      setUser(currentUser);
      if (currentUser) {
        errorLoggingService.setUser({ id: currentUser.id, email: currentUser.email });
      }
    } catch (error) {
      errorLoggingService.logAuthError(error instanceof Error ? error : new Error(String(error)), 'checkAuth');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      errorLoggingService.setUser({ id: loggedInUser.id, email: loggedInUser.email });
    } catch (error) {
      errorLoggingService.logAuthError(error instanceof Error ? error : new Error(String(error)), 'login');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Signup new user
   */
  const signup = useCallback(async (data: SignupRequest) => {
    try {
      setIsLoading(true);
      const newUser = await authService.signup(data);
      setUser(newUser);
      errorLoggingService.setUser({ id: newUser.id, email: newUser.email });
    } catch (error) {
      errorLoggingService.logAuthError(error instanceof Error ? error : new Error(String(error)), 'signup');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      errorLoggingService.clearUser();
    } catch (error) {
      errorLoggingService.logAuthError(error instanceof Error ? error : new Error(String(error)), 'logout');
      setUser(null);
      errorLoggingService.clearUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    login,
    signup,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };

