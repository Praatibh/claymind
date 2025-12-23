/**
 * ErrorState Component
 * Reusable error display with retry functionality
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card3D } from '../../app/components/3d-card';
import { Button3D } from '../../app/components/3d-button';

interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Retry button text */
  retryText?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether to render as full page */
  fullPage?: boolean;
  /** Whether to wrap in Card3D */
  card?: boolean;
  /** Custom className */
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  retryText = 'Try Again',
  icon,
  fullPage = false,
  card = true,
  className = '',
}: ErrorStateProps) {
  const content = (
    <div className={`text-center py-8 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
        {icon || <AlertCircle className="w-8 h-8 text-red-500" />}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button3D variant="primary" size="md" onClick={onRetry} icon={<RefreshCw className="w-4 h-4" />}>
          {retryText}
        </Button3D>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
        <div className="max-w-md mx-auto mt-20">
          {card ? <Card3D variant="default">{content}</Card3D> : content}
        </div>
      </div>
    );
  }

  if (card) {
    return <Card3D variant="default">{content}</Card3D>;
  }

  return content;
}
