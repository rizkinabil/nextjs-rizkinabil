'use client';

import { Experience } from '@/types/frontend.types';
import Image from 'next/image';
import { useState } from 'react';

type Props = { exp: Experience; isLast: boolean };

function CompanyLogo({ exp }: { exp: Experience }) {
  const [imgError, setImgError] = useState(false);
  const initials = exp.company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (exp.logo && !imgError) {
    return (
      <Image
        src={exp.logo}
        alt={exp.company}
        width={36}
        height={36}
        className="object-contain rounded-full"
        onError={() => setImgError(true)}
      />
    );
  }

  return <span className="text-emerald-400 font-bold text-xs leading-none">{initials}</span>;
}

export default function ExperienceTimeline({ exp, isLast }: Props) {
  return (
    <div className={`relative flex gap-5 group ${isLast ? '' : 'pb-10'}`}>
      {/* Logo circle — sits on top of the vertical line */}
      <div className="relative flex-shrink-0 z-10">
        <div className="w-[58px] h-[58px] rounded-full border border-gray-700/60 bg-gray-900 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-colors duration-300 shadow-lg">
          <CompanyLogo exp={exp} />
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 pt-1 ${isLast ? '' : 'border-b border-gray-800/30 pb-10 group-hover:border-emerald-500/10'} transition-colors duration-300`}
      >
        <p className="text-[11px] font-medium text-emerald-400/70 uppercase tracking-wider mb-1">{exp.period}</p>
        <h3 className="text-base font-semibold text-white mb-0.5 group-hover:text-emerald-400 transition-colors duration-300 leading-snug">
          {exp.job}
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          {exp.company}
          {exp.location ? <span className="text-gray-600"> · {exp.location}</span> : null}
        </p>
        <p className="text-sm text-white/55 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
          {exp.description}
        </p>
      </div>
    </div>
  );
}
