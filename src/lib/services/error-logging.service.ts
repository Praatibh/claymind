/**
 * Error Logging Service
 * Centralized error logging with Sentry integration stub
 * Replace stub methods with actual Sentry SDK calls in production
 */

export type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface ErrorContext {
  /** Component or module where error occurred */
  component?: string;
  /** User action that triggered the error */
  action?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** User ID if authenticated */
  userId?: string;
  /** Request/transaction ID */
  requestId?: string;
}

export interface BreadcrumbData {
  category: string;
  message: string;
  level?: ErrorSeverity;
  data?: Record<string, unknown>;
}

/**
 * Stub Sentry client - replace with actual @sentry/react in production
 */
const SentryStub = {
  captureException: (error: Error, context?: Record<string, unknown>) => {
    const eventId = `stub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    if (import.meta.env.DEV) {
      console.group(`[Sentry Stub] captureException`);
      console.error('Error:', error);
      if (context) console.log('Context:', context);
      console.log('Event ID:', eventId);
      console.groupEnd();
    }
    return eventId;
  },

  captureMessage: (message: string, level: ErrorSeverity = 'info') => {
    const eventId = `stub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    if (import.meta.env.DEV) {
      console.group(`[Sentry Stub] captureMessage`);
      console.log(`[${level.toUpperCase()}]`, message);
      console.log('Event ID:', eventId);
      console.groupEnd();
    }
    return eventId;
  },

  setUser: (user: { id?: string; email?: string; username?: string } | null) => {
    if (import.meta.env.DEV) {
      console.log('[Sentry Stub] setUser:', user);
    }
  },

  setTag: (key: string, value: string) => {
    if (import.meta.env.DEV) {
      console.log(`[Sentry Stub] setTag: ${key}=${value}`);
    }
  },

  setExtra: (key: string, value: unknown) => {
    if (import.meta.env.DEV) {
      console.log(`[Sentry Stub] setExtra: ${key}=`, value);
    }
  },

  addBreadcrumb: (breadcrumb: BreadcrumbData) => {
    if (import.meta.env.DEV) {
      console.log('[Sentry Stub] addBreadcrumb:', breadcrumb);
    }
  },

  withScope: (callback: (scope: typeof SentryStub) => void) => {
    callback(SentryStub);
  },
};

class ErrorLoggingService {
  private isInitialized = false;

  /**
   * Initialize the error logging service
   * In production, this would initialize Sentry with DSN
   */
  init(options?: { dsn?: string; environment?: string; release?: string }) {
    if (this.isInitialized) return;

    // Stub: In production, call Sentry.init() here
    if (import.meta.env.DEV) {
      console.log('[ErrorLogging] Initialized with options:', options || 'default');
    }

    this.isInitialized = true;
  }

  /**
   * Log an error with optional context
   */
  logError(error: Error, context?: ErrorContext): string {
    const eventId = SentryStub.withScope(() => {
      if (context?.component) {
        SentryStub.setTag('component', context.component);
      }
      if (context?.action) {
        SentryStub.setTag('action', context.action);
      }
      if (context?.userId) {
        SentryStub.setUser({ id: context.userId });
      }
      if (context?.requestId) {
        SentryStub.setTag('requestId', context.requestId);
      }
      if (context?.metadata) {
        Object.entries(context.metadata).forEach(([key, value]) => {
          SentryStub.setExtra(key, value);
        });
      }

      return SentryStub.captureException(error, context);
    });

    return eventId as unknown as string;
  }

  /**
   * Log a message with severity level
   */
  logMessage(message: string, level: ErrorSeverity = 'info', context?: ErrorContext): string {
    if (context?.component) {
      SentryStub.setTag('component', context.component);
    }
    return SentryStub.captureMessage(message, level);
  }

  /**
   * Log a warning
   */
  logWarning(message: string, context?: ErrorContext): string {
    return this.logMessage(message, 'warning', context);
  }

  /**
   * Log an API error with request details
   */
  logApiError(
    error: Error,
    requestInfo: {
      method: string;
      url: string;
      status?: number;
      requestId?: string;
    }
  ): string {
    return this.logError(error, {
      component: 'ApiClient',
      action: `${requestInfo.method} ${requestInfo.url}`,
      requestId: requestInfo.requestId,
      metadata: {
        status: requestInfo.status,
        url: requestInfo.url,
        method: requestInfo.method,
      },
    });
  }

  /**
   * Log a React component error from ErrorBoundary
   */
  logComponentError(
    error: Error,
    errorInfo: { componentStack?: string },
    componentName?: string
  ): string {
    return this.logError(error, {
      component: componentName || 'ErrorBoundary',
      action: 'render',
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  /**
   * Log an authentication error
   */
  logAuthError(error: Error, action: string): string {
    return this.logError(error, {
      component: 'Auth',
      action,
    });
  }

  /**
   * Add a breadcrumb for debugging
   */
  addBreadcrumb(data: BreadcrumbData): void {
    SentryStub.addBreadcrumb(data);
  }

  /**
   * Set the current user for error context
   */
  setUser(user: { id: string; email?: string; username?: string } | null): void {
    SentryStub.setUser(user);
  }

  /**
   * Clear current user context
   */
  clearUser(): void {
    SentryStub.setUser(null);
  }

  /**
   * Set a global tag for all future events
   */
  setTag(key: string, value: string): void {
    SentryStub.setTag(key, value);
  }
}

// Export singleton instance
export const errorLoggingService = new ErrorLoggingService();

// Initialize on import (can be reconfigured later)
errorLoggingService.init({
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION || '1.0.0',
});
