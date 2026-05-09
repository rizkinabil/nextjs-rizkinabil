'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = headings[0].id;

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 120 <= scrollY) {
          current = id;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {headings.map(({ level, text, id }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={cn(
                'block text-sm leading-snug py-1 border-l-2 transition-all duration-150',
                level === 1 ? 'pl-3' : level === 2 ? 'pl-3' : level === 3 ? 'pl-6' : 'pl-9',
                activeId === id
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
