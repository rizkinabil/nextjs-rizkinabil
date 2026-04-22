import { GiscusComments } from '@/components/GiscusComments';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { generateHTML } from '@tiptap/html';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';

const lowlight = createLowlight(all);

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  Link.configure({ openOnClick: false }),
  Image,
  CodeBlockLowlight.configure({ lowlight }),
];

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Rizki Nabil Aufa`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const html = post.content
    ? generateHTML(post.content as Parameters<typeof generateHTML>[0], extensions)
    : '<p>No content yet.</p>';

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <article className="pt-32 pb-24 px-4">
        <div className="container max-w-3xl mx-auto">
          <NextLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to blog
          </NextLink>

          <header className="mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <time dateTime={post.created_at} className="text-sm text-white/40">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-invert prose-emerald max-w-none prose-headings:font-serif prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-code:text-emerald-300 prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <GiscusComments />
        </div>
      </article>

      <Footer />
    </div>
  );
}
