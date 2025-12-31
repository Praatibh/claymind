/**
 * Input Component
 * Text input with design tokens
 */

import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'error' | 'success';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: InputSize;
  /** Validation state */
  state?: InputState;
  /** Label text */
  label?: string;
  /** Helper text below input */
  helperText?: string;
  /** Error message (sets state to error) */
  error?: string;
  /** Icon to show on left */
  iconLeft?: React.ReactNode;
  /** Icon to show on right */
  iconRight?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

const SIZE_STYLES: Record<InputSize, { input: string; icon: string }> = {
  sm: {
    input: 'px-3 py-1.5 text-sm rounded-[var(--radius-sm)]',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'px-4 py-2 text-base rounded-[var(--radius-md)]',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'px-4 py-3 text-lg rounded-[var(--radius-lg)]',
    icon: 'w-6 h-6',
  },
};

const STATE_STYLES: Record<InputState, string> = {
  default: `
    border-[var(--color-slate-300)]
    focus:border-[var(--color-purple-500)]
    focus:ring-[var(--color-purple-500)]
  `,
  error: `
    border-[var(--color-error)]
    focus:border-[var(--color-error)]
    focus:ring-[var(--color-error)]
  `,
  success: `
    border-[var(--color-purple-500)]
    focus:border-[var(--color-purple-500)]
    focus:ring-[var(--color-purple-500)]
  `,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      error,
      iconLeft,
      iconRight,
      fullWidth = false,
      type = 'text',
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    const currentState = error ? 'error' : state;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const sizeConfig = SIZE_STYLES[size];

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-[var(--color-slate-700)] font-medium text-sm"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {iconLeft && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-slate-400)]">
              <span className={sizeConfig.icon}>{iconLeft}</span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            disabled={disabled}
            className={`
              w-full
              bg-[var(--color-zinc-50)]
              border
              text-[var(--color-slate-900)]
              placeholder:text-[var(--color-slate-400)]
              transition-colors duration-[var(--transition-fast)]
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-slate-100)]
              ${sizeConfig.input}
              ${STATE_STYLES[currentState]}
              ${iconLeft ? 'pl-10' : ''}
              ${iconRight || isPassword || currentState !== 'default' ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {currentState === 'error' && !isPassword && (
              <AlertCircle className={`${sizeConfig.icon} text-[var(--color-error)]`} />
            )}
            {currentState === 'success' && !isPassword && (
              <Check className={`${sizeConfig.icon} text-[var(--color-purple-500)]`} />
            )}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[var(--color-slate-400)] hover:text-[var(--color-slate-600)] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={sizeConfig.icon} />
                ) : (
                  <Eye className={sizeConfig.icon} />
                )}
              </button>
            )}
            {iconRight && !isPassword && currentState === 'default' && (
              <span className={`${sizeConfig.icon} text-[var(--color-slate-400)]`}>
                {iconRight}
              </span>
            )}
          </div>
        </div>

        {(helperText || error) && (
          <p
            className={`
              mt-1.5 text-sm
              ${error ? 'text-[var(--color-error)]' : 'text-[var(--color-slate-500)]'}
            `}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
