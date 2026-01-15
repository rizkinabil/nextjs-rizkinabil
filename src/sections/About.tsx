'use client';

import { ToolboxItems } from '@/components/ToolboxItems';
import { useAboutData } from '@/hooks/usePortfolio';
import Image from 'next/image';

export const AboutSection = () => {
  const { profile, experiences, toolboxItems, highlights, loading, error } = useAboutData();

  // Loading state
  if (loading) {
    return (
      <div className="py-20 bg-gray-950 min-h-[80vh] flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  // Error state
  if (error || !profile) {
    return (
      <div className="py-20 bg-gray-950 min-h-[80vh] flex items-center justify-center">
        <div className="text-red-400">{error || 'Profile not found'}</div>
      </div>
    );
  }
  // Dummy Github Contribution SVG (mock)
  const githubContribution = (
    <svg viewBox="0 0 104 20" width="100%" height="40" className="mt-4">
      {[...Array(7)].map((_, row) =>
        [...Array(15)].map((_, col) => (
          <rect
            key={row + '-' + col}
            x={col * 7}
            y={row * 7}
            width="6"
            height="6"
            rx="1"
            fill={col % 3 === 0 ? '#34d399' : col % 4 === 0 ? '#38bdf8' : '#164e63'}
            opacity={Math.random() * 0.25 + 0.75}
          />
        ))
      )}
    </svg>
  );

  return (
    <div className="py-20 bg-gray-950 min-h-[80vh]">
      <div className="container max-w-5xl mx-auto px-2 md:px-6">
        <div className="flex flex-col md:flex-row md:gap-10 gap-8 mt-12">
          <aside className="w-full md:max-w-[270px] flex-shrink-0">
            <div className="flex flex-col items-center md:items-start">
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={112}
                height={112}
                className="w-28 h-28 rounded-full border border-gray-700 object-cover mb-3"
              />
              <span className="text-white font-bold text-2xl leading-6">{profile.name}</span>
              <span className="text-gray-400 text-base mb-2">@{profile.github}</span>
              <p className="text-sm text-white/80 mt-1 mb-2 text-center md:text-left min-h-[28px]">
                {profile.headline}
              </p>
              <div className="flex gap-2 my-1">
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="hover:text-emerald-400 text-white/70 text-xl"
                >
                  ✉️
                </a>
                <a
                  href={`https://github.com/${profile.github}`}
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 text-white/70 text-xl"
                >
                  🐙
                </a>
                <a
                  href={`https://linkedin.com/in/${profile.linkedin}`}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 text-white/70 text-xl"
                >
                  in
                </a>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <svg width="16" height="16" fill="currentColor" className="inline align-middle">
                  <circle cx="8" cy="8" r="7" stroke="#34495e" strokeWidth="2" fill="#16a34a80" />
                </svg>
                {profile.location}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 w-full">
                {highlights.map((h) => (
                  <span
                    key={h.label}
                    className="bg-gray-900 border border-gray-800 text-[12px] px-2 py-1 rounded mt-1 text-gray-300"
                  >
                    <span className="font-bold text-emerald-300">{h.value}</span>{' '}
                    <span className="text-gray-500 font-normal">{h.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1">Overview</h2>
              <p className="text-white/70 text-sm leading-6">{profile.summary}</p>
            </div>

            {/* Contribution chart */}
            <div className="mb-8">
              <h3 className="text-base text-gray-300 font-semibold mb-2">GitHub Contribution</h3>
              <div className="rounded border border-gray-800 bg-gray-900 py-2 px-2 w-fit">{githubContribution}</div>
            </div>

            <div className="mb-8">
              <h3 className="text-base text-gray-300 font-semibold mb-2">Tech Stack</h3>
              <div className="">
                <ToolboxItems items={toolboxItems} className="gap-3" />
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-base text-gray-300 font-semibold mb-3">Experience</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-800 bg-gray-900 p-4 flex flex-col gap-1">
                    <span className="font-semibold text-white text-base">{exp.job}</span>
                    <span className="text-emerald-400 text-sm">{exp.company}</span>
                    <span className="text-xs text-gray-400 mb-1">
                      {exp.period} • {exp.location}
                    </span>
                    <span className="text-xs text-white/70 leading-5">{exp.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
