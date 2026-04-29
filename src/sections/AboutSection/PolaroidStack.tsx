'use client';

import profilePicture from '@/assets/images/nabil-profile-picture.jpeg';
import smileImage from '@/assets/images/smile.jpeg';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type Props = {};

export default function PolaroidStack({}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-[230px] h-[290px] md:w-[260px] md:h-[330px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Back photo (smile) — slides to center on hover */}
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: isHovered ? 20 : 1 }}
        animate={isHovered ? { rotate: 1, y: -6, x: 0, scale: 1.05 } : { rotate: 6, y: 8, x: 4, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22 }}
      >
        <div className="bg-white p-3 pb-10 shadow-2xl w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <Image src={smileImage} alt="Nabil smiling" fill className="object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Front photo (profile) — lifts away on hover, returns on unhover */}
      <motion.div
        className="absolute inset-0"
        style={{ zIndex: isHovered ? 1 : 20 }}
        animate={isHovered ? { rotate: -16, y: -46, x: -18, scale: 0.86 } : { rotate: -3, y: 0, x: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 190, damping: 22 }}
      >
        <div className="bg-white p-3 pb-10 shadow-lg w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            <Image src={profilePicture} alt="Nabil" fill className="object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Figma collaboration cursor */}
      <motion.div
        className="absolute bottom-10 -right-6 flex items-start gap-1 pointer-events-none z-30 drop-shadow-md"
        animate={{
          x: [0, -16, 10, -8, 16, 0],
          y: [0, 10, -14, 18, -6, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 1.5L2 15.5L5.8 11.2L9 18.5L11.5 17.4L8.3 10L14.5 10L2 1.5Z"
            fill="#10b981"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="bg-emerald-500 text-white text-[11px] font-semibold px-2 py-[3px] rounded-md whitespace-nowrap -mt-px select-none">
          nabil
        </span>
      </motion.div>
    </div>
  );
}
