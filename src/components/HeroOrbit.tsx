import { PropsWithChildren } from 'react';

interface HeroOrbitProps {
  size: number;
  rotation: number;
}

export const HeroOrbit = ({ children, size, rotation }: PropsWithChildren<HeroOrbitProps>) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div
        className="animate-spin"
        style={{
          animationDuration: '30s',
          width: `${size}px`,
          height: `${size}px`,
          transform:  `rotate(${rotation}deg)`
        }}
      >
        <div
          className="inline-flex"
          style={{
            transform: `rotate(${rotation * -1}deg)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
