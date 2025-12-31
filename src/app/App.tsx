/**
 * Main App Component
 * Wraps application with Router, AuthProvider, and ErrorBoundary
 */

import { BrowserRouter } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from '../contexts/AuthContext';
import { AppRoutes } from '../routes';
import { errorLoggingService } from '../lib/services/error-logging.service';

// Google OAuth Client ID - Temporarily disabled for testing
// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

export default function App() {
  // Error handler for error boundary - additional callback beyond automatic logging
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Add breadcrumb for app-level error context
    errorLoggingService.addBreadcrumb({
      category: 'app',
      message: 'App-level error caught by ErrorBoundary',
      level: 'error',
      data: {
        errorMessage: error.message,
        componentStack: errorInfo.componentStack,
      },
    });
  };

  return (
    <ErrorBoundary onError={handleError}>
      {/* GoogleOAuthProvider temporarily disabled for testing */}
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <AppRoutes />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}