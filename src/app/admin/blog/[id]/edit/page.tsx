'use client';

import { TiptapEditor } from '@/components/admin/TiptapEditor';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState<object>({});
  const [initialContent, setInitialContent] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((post) => {
        setTitle(post.title ?? '');
        setSlug(post.slug ?? '');
        setExcerpt(post.excerpt ?? '');
        setTags((post.tags ?? []).join(', '));
        setInitialContent(post.content ?? {});
        setContent(post.content ?? {});
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load post.');
        setLoading(false);
      });
  }, [id]);

  const handleSave = async (published?: boolean) => {
    if (!title.trim() || !slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    setSaving(true);
    setError('');

    const body: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    if (published !== undefined) body.published = published;

    const res = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push('/admin/blog');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save post.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white/40">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin/blog" className="text-white/50 hover:text-white text-sm transition-colors">
                ← Posts
              </Link>
              <span className="text-white/20">/</span>
              <h1 className="text-white font-bold">Edit Post</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave()}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg border border-gray-600 text-white/70 hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save & Publish'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full bg-transparent text-3xl font-bold font-serif text-white placeholder:text-white/20 focus:outline-none"
          />

          <div className="flex items-center gap-2">
            <span className="text-white/30 text-sm">slug:</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white/50 focus:text-white focus:outline-none font-mono"
            />
          </div>

          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt (shown in blog list)"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white/80 placeholder:text-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated): nextjs, typescript"
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white/80 placeholder:text-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
          />
        </div>

        {initialContent !== null && (
          <TiptapEditor
            content={initialContent}
            onChange={setContent}
          />
        )}
      </main>
    </div>
  );
}
