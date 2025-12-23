/**
 * EmptyState Component
 * Reusable empty state with action button
 */

import { FolderOpen } from 'lucide-react';
import { Card3D } from '../../app/components/3d-card';
import { Button3D } from '../../app/components/3d-button';

interface EmptyStateProps {
  /** Empty state title */
  title?: string;
  /** Description message */
  message?: string;
  /** Action callback */
  onAction?: () => void;
  /** Action button text */
  actionText?: string;
  /** Action button icon */
  actionIcon?: React.ReactNode;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Icon background color class */
  iconBgColor?: string;
  /** Icon color class */
  iconColor?: string;
  /** Whether to wrap in Card3D */
  card?: boolean;
  /** Custom className */
  className?: string;
}

export function EmptyState({
  title = 'Nothing here yet',
  message = 'Get started by creating your first item.',
  onAction,
  actionText = 'Get Started',
  actionIcon,
  icon,
  iconBgColor = 'bg-purple-100',
  iconColor = 'text-purple-500',
  card = true,
  className = '',
}: EmptyStateProps) {
  const content = (
    <div className={`text-center py-12 ${className}`}>
      <div
        className={`w-20 h-20 rounded-full ${iconBgColor} flex items-center justify-center mx-auto mb-6`}
      >
        {icon || <FolderOpen className={`w-10 h-10 ${iconColor}`} />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {onAction && (
        <Button3D variant="primary" size="lg" onClick={onAction} icon={actionIcon}>
          {actionText}
        </Button3D>
      )}
    </div>
  );

  if (card) {
    return <Card3D variant="default">{content}</Card3D>;
  }

  return content;
}
