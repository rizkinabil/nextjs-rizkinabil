'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PenLine, Plus, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  tags: string[];
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/blog?admin=true');
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleTogglePublish = async (post: BlogPost) => {
    await fetch(`/api/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    setDeletingId(id);
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="text-white/50 hover:text-white text-sm transition-colors">
                ← Dashboard
              </Link>
              <span className="text-white/20">/</span>
              <h1 className="text-white font-bold">Blog Posts</h1>
            </div>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus className="size-4" />
              New post
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-white/40">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-white/40">No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
            >
              <Plus className="size-4" /> Write your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between gap-4 bg-gray-800 border border-gray-700 rounded-lg px-5 py-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? 'bg-emerald-500/15 text-emerald-400' : 'bg-gray-700 text-white/40'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <h2 className="text-white font-medium truncate">{post.title}</h2>
                  </div>
                  <p className="text-xs text-white/30 mt-1">
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    {post.tags?.length > 0 && ` · ${post.tags.join(', ')}`}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-600 text-white/60 hover:text-white hover:border-gray-500 transition-colors"
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Edit post"
                  >
                    <PenLine className="size-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-30"
                    aria-label="Delete post"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
