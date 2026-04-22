'use client';

import { TiptapEditor } from '@/components/admin/TiptapEditor';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState<object>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value));
  };

  const handleSave = async (published: boolean) => {
    if (!title.trim() || !slug.trim()) {
      setError('Title and slug are required.');
      return;
    }
    setSaving(true);
    setError('');

    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        published,
      }),
    });

    if (res.ok) {
      router.push('/admin/blog');
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to save post.');
      setSaving(false);
    }
  };

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
              <h1 className="text-white font-bold">New Post</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg border border-gray-600 text-white/70 hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50"
              >
                Save draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Publishing...' : 'Publish'}
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
            onChange={(e) => handleTitleChange(e.target.value)}
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

        <TiptapEditor
          onChange={setContent}
          placeholder="Start writing your post..."
        />
      </main>
    </div>
  );
}
