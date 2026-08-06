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
    <section className="relative py-16 lg:py-24" id="testimonials">
      <div className="container animate-pulse">
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="h-3 w-28 bg-white/10 rounded-full" />
          <div className="h-8 w-64 bg-white/10 rounded-lg" />
          <div className="h-4 w-72 bg-white/5 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10">
          <div className="lg:col-span-2 h-[240px] rounded-2xl bg-white/5" />
          <div className="flex flex-col gap-3">
            <div className="h-[100px] rounded-2xl bg-white/5" />
            <div className="h-[120px] rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    </section>
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
