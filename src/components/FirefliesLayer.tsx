// FirefliesLayer.tsx
'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

type FireflyProps = {
  // area terbang (diambil dari parent absolute inset-0)
  width: number;
  height: number;
  points?: number; // banyak waypoint (semakin besar, makin berkelok)
  size?: number; // diameter firefly (px)
  duration?: number; // lama 1 perjalanan (detik)
  delay?: number; // jeda awal (detik)
  seed?: number; // biar reproducible
};

function rand(seed: number) {
  // simple LCG biar path reproducible
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function makeWaypoints(w: number, h: number, n: number, r: () => number) {
  // bikin waypoint yang menyebar (hindari tepi banget)
  const padX = Math.max(24, w * 0.06);
  const padY = Math.max(24, h * 0.1);
  return Array.from({ length: n }, () => ({
    x: padX + r() * (w - padX * 2),
    y: padY + r() * (h - padY * 2),
  }));
}

const Firefly = ({ width, height, points = 7, size = 6, duration = 16, delay = 0, seed = 1 }: FireflyProps) => {
  const r = useMemo(() => rand(seed), [seed]);
  const path = useMemo(() => makeWaypoints(width, height, points, r), [width, height, points, r]);

  const xs = path.map((p) => p.x);
  const ys = path.map((p) => p.y);
  // keyframe "twinkle" halus
  const glow = [0.6, 1, 0.7, 1, 0.8];

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      initial={{ x: xs[0], y: ys[0], opacity: 0 }}
      animate={{
        x: xs,
        y: ys,
        opacity: [0, 1, 1, 1, 0.9],
        rotate: [0, 10, -5, 8, 0],
        boxShadow: glow.map((g) => `0 0 ${10 * g}px rgba(52,211,153,${0.8 * g})`),
        filter: glow.map((g) => `brightness(${1 + 0.3 * g})`),
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        times: xs.map((_, i) => i / (xs.length - 1)),
        delay,
        repeat: Infinity,
        repeatType: 'mirror', // balik lagi lewat lintasan yang sama → berasa ada “jalur”
      }}
      style={{
        width: size,
        height: size,
        borderRadius: '999px',
        backgroundColor: 'rgba(52,211,153,0.95)', // emerald-300
      }}
    >
      {/* core + tail kecil */}
      <motion.div
        className="absolute right-1/2 top-1/2 -translate-y-1/2"
        animate={{ width: [0, 10, 2], opacity: [0.0, 0.35, 0.2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          height: 2,
          borderRadius: 999,
          background: 'linear-gradient(to left, rgba(52,211,153,0.4), rgba(52,211,153,0))',
        }}
      />
    </motion.div>
  );
};

type FirefliesLayerProps = {
  count?: number;
};

/** Layer absolute full area; render beberapa fireflies dengan seed berbeda */
export const FirefliesLayer = ({ count = 14 }: FirefliesLayerProps) => {
  // ukuran relatif; biarin parent yg absolute inset-0 nentuin
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const height = typeof window !== 'undefined' ? Math.min(700, window.innerHeight) : 600;

  return (
    <div className="absolute inset-0 -z-10">
      {Array.from({ length: count }).map((_, i) => (
        <Firefly
          key={i}
          width={width}
          height={height}
          points={6 + (i % 3)} // variasi kelokan
          size={Math.random() < 0.3 ? 8 : 5} // ada yg lebih besar dikit
          duration={14 + (i % 6)} // beda kecepatan
          delay={(i * 0.7) % 5}
          seed={1337 + i * 97}
        />
      ))}
    </div>
  );
};
