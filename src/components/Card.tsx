import grainImage from '@/assets/images/grain.jpg';
import { cn } from '@/lib/utils';
import { CSSProperties, PropsWithChildren } from 'react';

interface CardProps {
  className?: string;
  style?: CSSProperties;
}

export const Card = ({ className, children, style }: PropsWithChildren<CardProps>) => {
  return (
    <div
      className={cn(
        "tbg-gray-800 rounded-3xl relative z-0 overflow-hidden after:-z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none p-6",
        className
      )}
      style={style}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>
      {children}
    </div>
  );
};
