'use client';

import { LoadingState } from '@/components/LoadingState';
import { createClient } from '@/lib/supabase/client';
import { useGetAbout } from '@/usecase/profile';
import { useGetFeaturedProjects } from '@/usecase/projects';
import { useGetTestimonials } from '@/usecase/testimonials';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const { profile, experiences, loading: aboutLoading } = useGetAbout();
  const { data: testimonials, loading: testimonialsLoading } = useGetTestimonials();
  const { data: projects, loading: projectsLoading } = useGetFeaturedProjects();
  const [blogCount, setBlogCount] = useState<number | null>(null);

  const loading = aboutLoading || testimonialsLoading || projectsLoading;

  useEffect(() => {
    fetch('/api/blog?admin=true')
      .then((r) => r.json())
      .then((posts) => setBlogCount(Array.isArray(posts) ? posts.length : 0))
      .catch(() => setBlogCount(0));
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-white font-bold text-xl">Portfolio Admin</h1>
            </div>
          </div>
        </nav>
        <LoadingState message="Loading dashboard data..." centered size="xl" variant="orbit" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-white font-bold text-xl">Portfolio Admin</h1>
            <button
              onClick={handleSignOut}
              className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
          <p className="text-gray-400">Manage your portfolio content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Profile</h3>
            <p className="text-2xl font-bold text-white mt-2">{profile ? '1' : '0'}</p>
            <p className="text-sm text-gray-500 mt-1">{profile?.name || 'No profile'}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Testimonials</h3>
            <p className="text-2xl font-bold text-emerald-400 mt-2">{testimonials?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Published reviews</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Projects</h3>
            <p className="text-2xl font-bold text-blue-400 mt-2">{projects?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Featured projects</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Blog Posts</h3>
            <p className="text-2xl font-bold text-purple-400 mt-2">{blogCount ?? '—'}</p>
            <Link href="/admin/blog" className="text-sm text-emerald-400 hover:text-emerald-300 mt-1 inline-block transition-colors">
              Manage posts →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Content</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-white font-medium">Profile</p>
                <p className="text-sm text-gray-400">{profile?.headline || 'No headline'}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-white font-medium">Latest Project</p>
                <p className="text-sm text-gray-400">{projects?.[0]?.title || 'No projects'}</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="text-white font-medium">Latest Experience</p>
                <p className="text-sm text-gray-400">{experiences?.[0]?.job || 'No experiences'}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/admin/blog/new"
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <span className="text-white text-sm font-medium">Write new blog post</span>
                <span className="text-white/40">→</span>
              </Link>
              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <span className="text-white text-sm font-medium">Manage blog posts</span>
                <span className="text-white/40">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
