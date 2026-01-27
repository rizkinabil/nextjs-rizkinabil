'use client';

import { ABOUT_IMAGES } from '@/constants/aboutImages';
import { useAboutData } from '@/hooks/usePortfolio';
import Image from 'next/image';

export const AboutSection = () => {
  const { profile, experiences, highlights, loading, error } = useAboutData();

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

  return (
    <div className="relative py-20 min-h-[80vh] overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #16a34a80, transparent 70%)' }}
      />

      <div className="container max-w-5xl mx-auto px-2 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:gap-10 gap-8 mt-24">
          {/* <aside className="w-full md:max-w-[270px] flex-shrink-0">
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
              <div className="flex items-center gap-2 my-1">
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
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
          </aside> */}

          <div className="flex-1 min-w-0">
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">The story of me being \</h1>
              <p className="text-white/70 text-base max-w-2xl mx-auto md:mx-0">
                This cool template is cooked up by <span className="text-emerald-400">Shaashi</span> and{' '}
                <span className="text-emerald-400">Sunai</span>. Feel free to spill the beans about yourself in this
                zone—share your work wizardry, your fave hobbies, and whatever floats your boat right now. This space is
                all about letting your story shine, so go ahead and tell it like it's hot!
              </p>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-20">
              {ABOUT_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-700/50 shadow-lg
                           transform transition-all duration-300 ease-out
                           hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20
                           hover:border-emerald-500/30
                           group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`About image ${idx + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="text-center md:text-left mb-12">
              <span className="block text-emerald-400 font-semibold text-sm mb-2">MY EXPERIENCES</span>
              <h2 className="text-4xl font-bold text-white">Where I've Been Employed</h2>
            </div>

            <div className="mb-8">
              {experiences.map((exp, idx) => (
                <div key={idx} className="mb-8 flex flex-col md:flex-row md:gap-8">
                  <div className="flex-shrink-0 md:w-1/3">
                    <h4 className="font-semibold text-white text-lg">{exp.job}</h4>
                    <p className="text-emerald-400 text-sm">{exp.company}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {exp.period} / {exp.location}
                    </p>
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <p className="text-sm text-white/80 leading-6">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-1">Overview</h2>
              <p className="text-white/70 text-sm leading-6">{profile.summary}</p>
            </div>

            {/* <div className="mb-8">
              <h3 className="text-base text-gray-300 font-semibold mb-2">Tech Stack</h3>
              <div className="overflow-x-scroll">
                <ToolboxItems items={TOOLBOX_ITEMS} className="gap-3" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
