'use client';

import { useAboutData, useFeaturedProjects, useTestimonials } from '@/hooks/usePortfolio';

export default function AdminDashboard() {
  const { profile, experiences, highlights, toolboxItems, loading: aboutLoading } = useAboutData();
  const { data: testimonials, loading: testimonialsLoading } = useTestimonials();
  const { data: projects, loading: projectsLoading } = useFeaturedProjects();

  const loading = aboutLoading || testimonialsLoading || projectsLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-white font-bold text-xl">Portfolio Admin</h1>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
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
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Experiences</h3>
            <p className="text-2xl font-bold text-purple-400 mt-2">{experiences?.length || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Work experiences</p>
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
            <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database</span>
                <span className="text-green-400 text-sm">● Connected</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">API</span>
                <span className="text-green-400 text-sm">● Healthy</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-gray-500 text-sm">Just now</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}