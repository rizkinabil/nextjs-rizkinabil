'use client';

import { cn } from '@/utils/cn';
import { Spinner } from './Spinner';

interface LoadingStateProps {
  message?: string;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ring' | 'dots' | 'pulse' | 'orbit';
  className?: string;
}

export const LoadingState = ({
  message = 'Loading...',
  centered = false,
  size = 'lg',
  variant = 'ring',
  className,
}: LoadingStateProps) => {
  if (centered) {
    return (
      <div className={cn('min-h-[80vh] flex items-center justify-center', className)}>
        <div className="flex flex-col items-center gap-4">
          <Spinner size={size} variant={variant} label={message} />
          {message && <p className="text-white/60 text-sm font-medium animate-pulse">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="flex flex-col items-center gap-4">
        <Spinner size={size} variant={variant} label={message} />
        {message && <p className="text-white/60 text-sm font-medium animate-pulse">{message}</p>}
      </div>
    </div>
  );
};
