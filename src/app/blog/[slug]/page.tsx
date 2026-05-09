import { GiscusComments } from '@/components/GiscusComments';
import { TableOfContents, type TocItem } from '@/components/TableOfContents';
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
  Image.configure({ HTMLAttributes: { loading: 'lazy' } }),
  CodeBlockLowlight.configure({ lowlight }),
];

// ── Utilities ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Minimal hast-node → HTML string (only needs to handle lowlight output) */
function hastToHtml(node: any): string {
  if (node.type === 'text') {
    return node.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
  if (node.type === 'element') {
    const props = node.properties ?? {};
    const attrs = Object.entries(props)
      .filter(([, v]) => v !== false && v !== null && v !== undefined)
      .map(([key, val]) => {
        const name = key === 'className' ? 'class' : key.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
        if (val === true) return name;
        const value = Array.isArray(val) ? val.join(' ') : String(val);
        return `${name}="${value}"`;
      })
      .join(' ');
    const children = (node.children ?? []).map(hastToHtml).join('');
    return attrs
      ? `<${node.tagName} ${attrs}>${children}</${node.tagName}>`
      : `<${node.tagName}>${children}</${node.tagName}>`;
  }
  if (node.type === 'root') {
    return (node.children ?? []).map(hastToHtml).join('');
  }
  return '';
}

/**
 * Find every <pre><code class="language-*"> block in the generated HTML and
 * replace it with lowlight-highlighted HTML (adds the hljs-* spans).
 */
function applyCodeHighlighting(html: string): string {
  return html.replace(
    /<pre><code(?:\s+class="language-(\w+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, encoded) => {
      // generateHTML HTML-encodes the raw code — decode before highlighting
      const code = (encoded as string)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      try {
        const tree = lang
          ? lowlight.highlight(lang, code)
          : lowlight.highlightAuto(code);
        const highlighted = hastToHtml(tree);
        const langClass = lang ? ` language-${lang}` : '';
        return `<pre><code class="hljs${langClass}">${highlighted}</code></pre>`;
      } catch {
        // Fallback: still add hljs class so base background color applies
        const langClass = lang ? ` language-${lang}` : '';
        return `<pre><code class="hljs${langClass}">${encoded}</code></pre>`;
      }
    }
  );
}

/** Add id="slug" to every h1/h2/h3 element for TOC anchor links. */
function addHeadingIds(html: string): string {
  return html.replace(
    /<(h[1-3])(\s[^>]*)?>([\s\S]*?)<\/\1>/g,
    (_, tag, existingAttrs, content) => {
      const text = content.replace(/<[^>]*>/g, '');
      const id = slugify(text);
      const attrs = existingAttrs ?? '';
      return `<${tag}${attrs} id="${id}">${content}</${tag}>`;
    }
  );
}

/** Extract heading data from the Tiptap JSON content for the TOC component. */
function extractTOC(content: Record<string, any>): TocItem[] {
  return (content.content ?? [])
    .filter((node: any) => node.type === 'heading')
    .map((node: any) => {
      const text = (node.content ?? [])
        .map((c: any) => c.text ?? '')
        .join('');
      return { level: node.attrs?.level ?? 2, text, id: slugify(text) };
    })
    .filter((item: TocItem) => item.text.length > 0);
}

// ── Page ─────────────────────────────────────────────────────────────────────

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

  const rawHtml = post.content
    ? generateHTML(post.content as Parameters<typeof generateHTML>[0], extensions)
    : '<p>No content yet.</p>';

  // Server-side post-processing: syntax highlighting + heading IDs
  const html = addHeadingIds(applyCodeHighlighting(rawHtml));

  const toc = post.content
    ? extractTOC(post.content as Record<string, any>)
    : [];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <article className="pt-32 pb-24 px-4">
        {/* On large screens: wide container that fits content + TOC side by side.
            On small screens: collapse to max-w-3xl so content stays centred. */}
        <div className="mx-auto max-w-3xl lg:max-w-6xl">
          <div className="lg:flex lg:gap-16 lg:items-start">

            {/* ── Main content ── */}
            <div className="min-w-0 lg:flex-1 lg:max-w-3xl">
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
                className="prose prose-invert prose-emerald max-w-none prose-headings:font-serif prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-lg"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              <GiscusComments />
            </div>

            {/* ── TOC sidebar — visible on lg+ (1024px+) screens ── */}
            {toc.length > 0 && (
              <aside className="hidden lg:block w-52 shrink-0 sticky top-32 self-start pt-[5.5rem]">
                <TableOfContents headings={toc} />
              </aside>
            )}

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
