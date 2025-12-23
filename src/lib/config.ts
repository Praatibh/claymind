/**
 * Environment configuration
 * Uses VITE_ prefix for Vite environment variables
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  },
  app: {
    env: import.meta.env.MODE || 'development',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },
  auth: {
    tokenKey: 'claymind_access_token',
    refreshTokenKey: 'claymind_refresh_token',
  },
} as const;

