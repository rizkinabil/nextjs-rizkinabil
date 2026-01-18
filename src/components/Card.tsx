'use client';

import { cn } from '@/utils/cn';
import { CSSProperties, PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
  style?: CSSProperties;
  source?: string; // e.g., "LinkedIn"
}

export const Card = ({ className, children, style, source }: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={cn(
        'bg-gray-800 rounded-3xl relative z-0 overflow-hidden transition-all duration-500 ease-in-out',
        "after:-z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none",
        className
      )}
      style={{
        ...style,
      }}
    >
      {/* Header with Source Badge */}
      <div className="flex justify-between items-start mb-4">
        {source && (
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50 bg-white/10 px-3 py-1 rounded-full">
            Source: {source}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">{children}</div>
    </div>
  );
};
