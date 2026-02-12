'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'ring' | 'dots' | 'pulse' | 'orbit';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const dotSizes = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-4 h-4',
  xl: 'w-6 h-6',
};

export const Spinner = ({ size = 'md', variant = 'ring', className, label = 'Loading...' }: SpinnerProps) => {
  if (variant === 'ring') {
    return (
      <div className={cn('relative', sizeClasses[size], className)} role="status" aria-label={label}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0) 0%, rgba(16, 185, 129, 0.8) 50%, rgba(16, 185, 129, 0) 100%)',
            maskImage: 'radial-gradient(circle, transparent 35%, black 35%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 35%, black 35%)',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-emerald-500/20"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex gap-2 items-center', className)} role="status" aria-label={label}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={cn('rounded-full bg-emerald-500', dotSizes[size])}
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('relative', sizeClasses[size], className)} role="status" aria-label={label}>
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/30"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.2,
          }}
        />
        <div className="absolute inset-0 rounded-full bg-emerald-500" />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  if (variant === 'orbit') {
    const orbitSize = {
      sm: 24,
      md: 40,
      lg: 64,
      xl: 96,
    }[size];

    return (
      <div className={cn('relative', sizeClasses[size], className)} role="status" aria-label={label}>
        {/* Orbit path */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />

        {/* Orbiting element */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: orbitSize / 5,
            height: orbitSize / 5,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/50"
            style={{
              width: orbitSize / 5,
              height: orbitSize / 5,
            }}
          />
        </motion.div>

        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/50"
          style={{
            width: orbitSize / 8,
            height: orbitSize / 8,
          }}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return null;
};
