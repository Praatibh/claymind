/**
 * LoadingState Component
 * Reusable loading indicator for screens and sections
 */

import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  /** Loading message to display */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to render as full page */
  fullPage?: boolean;
  /** Custom className */
  className?: string;
}

const SIZE_CONFIG = {
  sm: { spinner: 'w-6 h-6', text: 'text-sm', padding: 'py-4' },
  md: { spinner: 'w-10 h-10', text: 'text-base', padding: 'py-12' },
  lg: { spinner: 'w-12 h-12', text: 'text-lg', padding: 'py-16' },
};

export function LoadingState({
  message = 'Loading...',
  size = 'md',
  fullPage = false,
  className = '',
}: LoadingStateProps) {
  const config = SIZE_CONFIG[size];

  const content = (
    <div className={`flex flex-col items-center justify-center ${config.padding} ${className}`}>
      <Loader2 className={`${config.spinner} animate-spin text-purple-500 mb-4`} />
      <p className={`text-gray-600 ${config.text}`}>{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
