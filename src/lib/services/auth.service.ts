/**
 * Authentication Service
 * Service layer for authentication operations using the API client
 */

import { api } from '../api';
import { errorLoggingService } from './error-logging.service';
import type { LoginRequest, SignupRequest, User, AuthResponse } from '../types/api';

export class AuthService {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<User> {
    const response: AuthResponse = await api.login(credentials);
    
    // Store tokens in localStorage (handled by API client)
    if (response.accessToken) {
      api.setAccessToken(response.accessToken);
    }
    if (response.refreshToken) {
      api.setRefreshToken(response.refreshToken);
    }

    return response.user;
  }

  /**
   * Signup new user
   */
  async signup(data: SignupRequest): Promise<User> {
    const response: AuthResponse = await api.signup(data);
    
    // Store tokens in localStorage (handled by API client)
    if (response.accessToken) {
      api.setAccessToken(response.accessToken);
    }
    if (response.refreshToken) {
      api.setRefreshToken(response.refreshToken);
    }

    return response.user;
  }

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    try {
      await api.logout();
    } catch (error) {
      // Even if logout API call fails, clear local tokens
      errorLoggingService.logAuthError(
        error instanceof Error ? error : new Error(String(error)),
        'logout API call'
      );
    } finally {
      // Always clear tokens locally
      api.clearTokens();
    }
  }

  /**
   * Check if user is authenticated and get current user
   * Returns null if not authenticated or token is invalid
   */
  async checkAuth(): Promise<User | null> {
    try {
      const user = await api.getUserProfile();
      return user;
    } catch (error) {
      // If check fails, clear tokens and return null
      api.clearTokens();
      return null;
    }
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('claymind_access_token');
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

// Export singleton instance
export const authService = new AuthService();

