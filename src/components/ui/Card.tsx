/**
 * Card Component
 * Simple card with border and shadow using design tokens
 */

import { forwardRef } from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: CardVariant;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Enable hover effect */
  hover?: boolean;
  /** Make card clickable */
  clickable?: boolean;
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const VARIANT_STYLES: Record<CardVariant, string> = {
  default: `
    bg-white
    border border-[var(--color-slate-200)]
    shadow-[var(--shadow-sm)]
  `,
  outlined: `
    bg-white
    border border-[var(--color-slate-300)]
  `,
  elevated: `
    bg-white
    border border-[var(--color-slate-100)]
    shadow-[var(--shadow-md)]
  `,
  filled: `
    bg-[var(--color-zinc-100)]
    border border-transparent
  `,
};

const PADDING_STYLES: Record<string, string> = {
  none: '',
  sm: 'p-[var(--spacing-3)]',
  md: 'p-[var(--spacing-4)]',
  lg: 'p-[var(--spacing-6)]',
};

const HOVER_STYLES = `
  hover:shadow-[var(--shadow-md)]
  hover:border-[var(--color-slate-300)]
  transition-shadow duration-[var(--transition-normal)]
`;

const CLICKABLE_STYLES = `
  cursor-pointer
  hover:shadow-[var(--shadow-md)]
  hover:border-[var(--color-purple-300)]
  active:shadow-[var(--shadow-sm)]
  transition-all duration-[var(--transition-fast)]
`;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      clickable = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-[var(--radius-lg)]
          ${VARIANT_STYLES[variant]}
          ${PADDING_STYLES[padding]}
          ${hover && !clickable ? HOVER_STYLES : ''}
          ${clickable ? CLICKABLE_STYLES : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          pb-[var(--spacing-3)]
          border-b border-[var(--color-slate-200)]
          mb-[var(--spacing-4)]
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          pt-[var(--spacing-3)]
          border-t border-[var(--color-slate-200)]
          mt-[var(--spacing-4)]
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
