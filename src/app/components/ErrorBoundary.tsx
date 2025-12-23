import React, { Component, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { errorLoggingService } from '../../lib/services/error-logging.service';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Production-level error boundary component
 * Catches and handles React component errors gracefully
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;

    // Log error to error logging service
    errorLoggingService.logComponentError(error, {
      componentStack: errorInfo.componentStack || undefined,
    });

    // Call optional error callback
    onError?.(error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <motion.div
          className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-md w-full">
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </motion.div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>

              <p className="text-gray-600 mb-6">
                Don't worry, it's not your fault. Let's try again!
              </p>

              {error && (
                <details className="text-left text-xs text-gray-500 mb-6 p-4 bg-gray-50 rounded-lg">
                  <summary className="cursor-pointer font-semibold">Error Details</summary>
                  <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
                  {error.stack && (
                    <pre className="mt-2 whitespace-pre-wrap text-xs opacity-75">{error.stack}</pre>
                  )}
                </details>
              )}

              <Button
                onClick={this.handleReset}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    return children;
  }
}