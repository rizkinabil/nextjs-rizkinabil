'use client';

import { LoadingState } from '@/components/LoadingState';
import ExperienceTimeline from '@/sections/AboutSection/ExperienceTimeline';
import PolaroidStack from '@/sections/AboutSection/PolaroidStack';
import { useGetAbout } from '@/usecase/profile';

export const AboutSection = () => {
  const { profile, experiences, loading, error } = useGetAbout();

  if (loading) {
    return (
      <div className="py-20 bg-gray-950 min-h-[80vh]">
        <LoadingState message="Loading profile..." centered size="xl" variant="orbit" />
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
      {/* Multiple Background highlights */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top center highlight */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          }}
        />
        {/* Left side highlight */}
        <div
          className="absolute top-1/3 left-0 w-[600px] h-[500px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 60%)',
          }}
        />
        {/* Right side highlight */}
        <div
          className="absolute bottom-1/4 right-0 w-[700px] h-[600px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="container max-w-5xl mx-auto px-2 md:px-6 relative">
        <div className="flex flex-col gap-8 mt-24 px-4">
          <div className="flex-1 min-w-0">
            {/* About Me — 2-column: text left, polaroid photos right */}
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-28">
              {/* Left: Text */}
              <div className="flex-1 min-w-0">
                <span className="block text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-4">
                  ABOUT ME
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight font-serif">
                  The journey of me
                </h1>
                <p className="text-white/40 text-sm mb-6">My journey in few words</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  I build software that scales both technically and across borders. From dashboards used by top
                  management to enterprise systems supporting international operations, I&apos;ve spent my career
                  bridging the gap between beautiful interfaces and scalable architecture. I&apos;m all about writing
                  code that&apos;s not just functional, but maintainable, and performant. Currently collaborating with
                  Korean dev teams, I&apos;m living proof that good communication and clean code go hand in hand.
                </p>
              </div>

              {/* Right: Polaroid photo stack + Figma cursor */}
              <PolaroidStack />
            </div>

            {/* Experience Timeline */}
            <div className="max-w-2xl mx-auto mb-20">
              <div className="text-center mb-12">
                <span className="block text-emerald-400 font-semibold text-xs uppercase tracking-widest mb-3">
                  MY EXPERIENCES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Where I&apos;ve Been Employed</h2>
              </div>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" />

                <div className="space-y-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceTimeline key={idx} exp={exp} isLast={idx === experiences.length - 1} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
