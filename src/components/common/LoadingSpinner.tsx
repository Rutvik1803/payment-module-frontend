/**
 * LoadingSpinner Component
 * Reusable loading spinner with customizable size, message, and style
 */

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Optional loading message */
  message?: string;
  /** Additional className for the container */
  className?: string;
  /** Show spinner in fullscreen center */
  fullscreen?: boolean;
  /** Show spinner inline (no centering) */
  inline?: boolean;
  /** Color variant */
  variant?: 'primary' | 'secondary' | 'white';
}

export function LoadingSpinner({
  size = 'md',
  message,
  className,
  fullscreen = false,
  inline = false,
  variant = 'primary',
}: LoadingSpinnerProps) {
  // Size classes for the spinner
  const sizeClasses = {
    xs: 'h-3 w-3 border-2',
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
    xl: 'h-16 w-16 border-4',
  };

  // Variant classes for spinner colors
  const variantClasses = {
    primary: 'border-gray-200 border-t-gray-800',
    secondary: 'border-gray-100 border-t-gray-600',
    white: 'border-white/30 border-t-white',
  };

  // Message text size based on spinner size
  const messageSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeClasses[size],
        variantClasses[variant],
      )}
      role="status"
      aria-label="Loading"
    />
  );

  // Inline spinner - just the spinner without any wrapper
  if (inline) {
    return spinner;
  }

  // Fullscreen centered spinner
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-3">
          {spinner}
          {message && (
            <p
              className={cn(
                'font-medium text-gray-700',
                messageSizeClasses[size],
              )}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: centered in container
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      {spinner}
      {message && (
        <p
          className={cn(
            'mt-3 font-medium text-gray-600',
            messageSizeClasses[size],
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * Inline variants for common use cases
 */
export const InlineSpinner = ({ size = 'sm' }: { size?: 'xs' | 'sm' }) => (
  <LoadingSpinner size={size} inline />
);

export const TableLoadingSpinner = ({ message }: { message?: string }) => (
  <div className="bg-white border rounded-lg p-12">
    <LoadingSpinner size="lg" message={message || 'Loading...'} />
  </div>
);

export const CardLoadingSpinner = ({ message }: { message?: string }) => (
  <div className="flex items-center justify-center p-8">
    <LoadingSpinner size="md" message={message} />
  </div>
);
