import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { HeroSection } from '@/sections/Hero';
import { ProjectsSection } from '@/sections/Projects';
import { TapeSection } from '@/sections/Tape';
import { TestimonialsSection } from '@/sections/Testimonials';
import { Suspense } from 'react';

function ProjectsSkeleton() {
  return (
    <section className="relative pb-16 lg:py-24" id="projects">
      <div className="container animate-pulse">
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="h-4 w-32 bg-white/10 rounded-full" />
          <div className="h-8 w-64 bg-white/10 rounded-lg" />
          <div className="h-4 w-96 bg-white/5 rounded-full" />
        </div>
        <div className="flex flex-col gap-11">
          {[0, 1].map((i) => (
            <div key={i} className="h-[400px] md:h-[500px] rounded-3xl bg-white/5" />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-5 animate-pulse">
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="h-4 w-32 bg-white/10 rounded-full" />
          <div className="h-8 w-72 bg-white/10 rounded-lg" />
          <div className="h-4 w-80 bg-white/5 rounded-full" />
        </div>
        <div className="flex gap-8 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-shrink-0 w-80 md:w-96 h-52 rounded-3xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsSection />
      </Suspense>
      <TapeSection />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Footer />
    </div>
  );
}
