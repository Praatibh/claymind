/**
 * Button Component
 * Simple button with solid colors using design tokens
 */

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'destructive' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner */
  loading?: boolean;
  /** Icon to show before text */
  icon?: React.ReactNode;
  /** Icon to show after text */
  iconRight?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-purple-500)]
    hover:bg-[var(--color-purple-600)]
    active:bg-[var(--color-purple-700)]
    text-white
    border-transparent
  `,
  secondary: `
    bg-[var(--color-amber-400)]
    hover:bg-[var(--color-amber-500)]
    active:bg-[var(--color-amber-600)]
    text-[var(--color-slate-900)]
    border-transparent
  `,
  success: `
    bg-[var(--color-amber-500)]
    hover:bg-[var(--color-amber-600)]
    active:bg-[var(--color-amber-700)]
    text-white
    border-transparent
  `,
  destructive: `
    bg-[var(--color-error)]
    hover:bg-red-600
    active:bg-red-700
    text-white
    border-transparent
  `,
  outline: `
    bg-transparent
    hover:bg-[var(--color-slate-100)]
    active:bg-[var(--color-slate-200)]
    text-[var(--color-slate-700)]
    border-[var(--color-slate-300)]
  `,
  ghost: `
    bg-transparent
    hover:bg-[var(--color-slate-100)]
    active:bg-[var(--color-slate-200)]
    text-[var(--color-slate-700)]
    border-transparent
  `,
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-[var(--radius-sm)]',
  md: 'px-4 py-2 text-base gap-2 rounded-[var(--radius-md)]',
  lg: 'px-6 py-3 text-lg gap-2.5 rounded-[var(--radius-lg)]',
};

const ICON_SIZES: Record<ButtonSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconRight,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center
          font-semibold
          border
          transition-colors duration-[var(--transition-fast)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-purple-500)] focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${VARIANT_STYLES[variant]}
          ${SIZE_STYLES[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <Loader2 className={`${ICON_SIZES[size]} animate-spin`} />
        ) : icon ? (
          <span className={ICON_SIZES[size]}>{icon}</span>
        ) : null}
        {children}
        {iconRight && !loading && <span className={ICON_SIZES[size]}>{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
