'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  FileText,
  Mail,
  MapPin,
  Search,
  User,
  X,
} from 'lucide-react';
import { useUmami } from '@/hooks/useUmami';
import { isTextUIPart } from 'ai';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// ─── Types ────────────────────────────────────────────────────────────────────

type CommandId = 'info' | 'projects' | 'cv' | 'blog' | 'contact';
type Mode = 'idle' | CommandId | 'ai';

const COMMANDS: { id: CommandId; label: string; desc: string; icon: React.ElementType; shortcut: string }[] = [
  { id: 'info',     label: 'My Info',    desc: 'Profile & contact details', icon: User,     shortcut: '/info'     },
  { id: 'projects', label: 'Projects',   desc: 'Browse my work',            icon: Briefcase, shortcut: '/projects' },
  { id: 'cv',       label: 'Experience', desc: 'Work history & skills',     icon: FileText,  shortcut: '/cv'       },
  { id: 'blog',     label: 'Blog',       desc: 'Recent articles',           icon: BookOpen,  shortcut: '/blog'     },
  { id: 'contact',  label: 'Contact',    desc: 'Get in touch',              icon: Mail,      shortcut: '/contact'  },
];

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Loader() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-8">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-bounce"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
      {children}
    </p>
  );
}

// ─── Template views ───────────────────────────────────────────────────────────

function InfoView() {
  const [profile, setProfile] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch('/api/profile').then((r) => r.json()).then(setProfile);
  }, []);

  if (!profile) return <Loader />;

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="font-serif text-xl text-white">{profile.name}</h2>
        {profile.headline && <p className="text-sm text-emerald-400 mt-0.5">{profile.headline}</p>}
        {profile.summary && <p className="text-sm text-white/50 mt-2 leading-relaxed">{profile.summary}</p>}
      </div>
      <div className="space-y-1.5 border-t border-white/5 pt-3">
        {profile.location && (
          <div className="flex items-center gap-2.5 text-sm text-white/50">
            <MapPin className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
            {profile.location}
          </div>
        )}
        {profile.email && (
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2.5 text-sm text-white/50 hover:text-emerald-400 transition-colors">
            <Mail className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
            {profile.email}
          </a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-emerald-400 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
            GitHub
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/50 hover:text-emerald-400 transition-colors">
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400/60 shrink-0" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsView({ onClose }: { onClose: () => void }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects').then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="divide-y divide-white/5">
      {projects.map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">{p.title}</p>
            <p className="text-xs text-white/35 mt-0.5">{p.company} · {p.year}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {(Array.isArray(p.tech_stack) ? p.tech_stack : []).slice(0, 2).map((t: string) => (
              <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-white/40 hidden sm:inline">{t}</span>
            ))}
            <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-400 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function CVView() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experiences').then((r) => r.json()).then((d) => { setExperiences(d); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-4 space-y-4">
      {experiences.map((e, i) => (
        <div key={e.id} className={`space-y-0.5 ${i > 0 ? 'pt-4 border-t border-white/5' : ''}`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-sm font-medium text-white/90">{e.job_title}</p>
              <p className="text-xs text-emerald-400">{e.company}</p>
            </div>
            <span className="text-xs text-white/35 shrink-0">{e.period}</span>
          </div>
          {e.description && (
            <p className="text-xs text-white/45 leading-relaxed line-clamp-2">{e.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function BlogView({ onClose }: { onClose: () => void }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog').then((r) => r.json()).then((d) => { setPosts(d); setLoading(false); });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="divide-y divide-white/5">
      {posts.slice(0, 7).map((p) => (
        <Link
          key={p.id}
          href={`/blog/${p.slug}`}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors truncate">{p.title}</p>
            {p.excerpt && <p className="text-xs text-white/35 mt-0.5 line-clamp-1">{p.excerpt}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-white/30">{new Date(p.created_at).getFullYear()}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-emerald-400 transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function ContactView() {
  const [profile, setProfile] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetch('/api/profile').then((r) => r.json()).then(setProfile);
  }, []);

  if (!profile) return <Loader />;

  const links = [
    profile.email    && { label: profile.email,  href: `mailto:${profile.email}`,   icon: Mail         },
    profile.linkedin && { label: 'LinkedIn',      href: profile.linkedin,            icon: ArrowUpRight },
    profile.github   && { label: 'GitHub',        href: profile.github,              icon: ArrowUpRight },
  ].filter(Boolean) as { label: string; href: string; icon: React.ElementType }[];

  return (
    <div className="p-3 space-y-1">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-sm text-white/60 group-hover:text-white transition-colors">{link.label}</span>
            <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-emerald-400 transition-colors ml-auto" />
          </a>
        );
      })}
    </div>
  );
}

const THINKING_PHRASES = [
  'Thinking...',
  'Reading through the portfolio...',
  'Looking into that...',
  'Gathering context...',
  'Putting thoughts together...',
  'Analyzing your question...',
  'Searching for an answer...',
  'Almost there...',
];

function ThinkingIndicator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % THINKING_PHRASES.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex gap-1 shrink-0">
        {[0, 150, 300].map((d) => (
          <span
            key={d}
            className="w-1 h-1 rounded-full bg-emerald-400 animate-bounce"
            style={{ animationDelay: `${d}ms` }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-emerald-400/60 font-mono"
        >
          {THINKING_PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function AIView({ messages, isLoading }: { messages: any[]; isLoading: boolean }) {
  const awaitingResponse = isLoading && messages[messages.length - 1]?.role === 'user';
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll thinking indicator into view whenever a new request starts
  useEffect(() => {
    if (awaitingResponse) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [awaitingResponse]);

  const mdComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
    p:      ({ children }) => <p className="leading-relaxed">{children}</p>,
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em:     ({ children }) => <em className="italic text-white/60">{children}</em>,
    code:   ({ children }) => <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono text-emerald-300">{children}</code>,
    ul:     ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
    ol:     ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
    li:     ({ children }) => <li>{children}</li>,
    h1:     ({ children }) => <h1 className="font-serif text-base text-white">{children}</h1>,
    h2:     ({ children }) => <h2 className="font-semibold text-sm text-white">{children}</h2>,
    h3:     ({ children }) => <h3 className="font-medium text-sm text-white/90">{children}</h3>,
  };

  return (
    <div className="p-4 space-y-4">
      {lastAssistant && (
        <div className="text-sm text-white/75 leading-relaxed space-y-2">
          {lastAssistant.parts.map((part: any, i: number) =>
            isTextUIPart(part) ? (
              <ReactMarkdown key={i} components={mdComponents}>
                {part.text}
              </ReactMarkdown>
            ) : null
          )}
        </div>
      )}
      {awaitingResponse && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

// ─── Command list ─────────────────────────────────────────────────────────────

function CommandList({ query, onSelect }: { query: string; onSelect: (id: CommandId) => void }) {
  const filtered = COMMANDS.filter(
    (c) => !query || c.shortcut.includes(query.toLowerCase()) || c.label.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    return <p className="px-4 py-8 text-sm text-center text-white/25">No commands found</p>;
  }

  return (
    <div>
      <SectionTitle>Commands</SectionTitle>
      {filtered.map((cmd) => {
        const Icon = cmd.icon;
        return (
          <button
            key={cmd.id}
            onClick={() => onSelect(cmd.id)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-400/30 transition-colors shrink-0">
              <Icon className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/75 group-hover:text-white transition-colors">{cmd.label}</p>
              <p className="text-xs text-white/35">{cmd.desc}</p>
            </div>
            <code className="text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5 shrink-0">{cmd.shortcut}</code>
          </button>
        );
      })}
      {!query && (
        <p className="px-4 py-2.5 text-xs text-white/20 border-t border-white/5">
          Or type any question and press ↵ to ask AI
        </p>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<Mode>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const { track } = useUmami();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Ctrl+K / Cmd+K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const onEvent = () => setIsOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-command-palette', onEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-command-palette', onEvent);
    };
  }, []);

  // Escape to back or close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Escape') return;
      if (mode !== 'idle') {
        setMode('idle');
        setQuery('');
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, mode]);

  // Focus input on open, reset on close, track open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      track('command-palette-open');
    } else {
      setQuery('');
      setMode('idle');
    }
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = query.trim();
    if (!text || text.startsWith('/')) return;
    track('command-palette-ai-ask');
    sendMessage({ text });
    setMode('ai');
    setQuery('');
  }

  function selectCommand(id: CommandId) {
    track('command-palette-command', { command: id });
    setMode(id);
    setQuery('');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    // Typing in a command view should go back to idle
    if (mode !== 'idle' && mode !== 'ai') setMode('idle');
  }

  const activeCommand = COMMANDS.find((c) => c.id === mode);

  function renderContent() {
    if (mode === 'ai')       return <AIView messages={messages} isLoading={isLoading} />;
    if (mode === 'info')     return <InfoView />;
    if (mode === 'projects') return <ProjectsView onClose={() => setIsOpen(false)} />;
    if (mode === 'cv')       return <CVView />;
    if (mode === 'blog')     return <BlogView onClose={() => setIsOpen(false)} />;
    if (mode === 'contact')  return <ContactView />;
    return <CommandList query={query.startsWith('/') ? query : ''} onSelect={selectCommand} />;
  }

  return (
    <>
      {/* Palette */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-xl bg-gray-950 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Search bar */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2.5 px-4 py-3.5 border-b border-white/10">
                {activeCommand ? (
                  <button
                    type="button"
                    onClick={() => { setMode('idle'); setQuery(''); }}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-2 py-1 hover:bg-emerald-400/20 transition-colors shrink-0 whitespace-nowrap"
                  >
                    ← {activeCommand.label}
                  </button>
                ) : mode === 'ai' ? (
                  <button
                    type="button"
                    onClick={() => { setMode('idle'); setQuery(''); }}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-2 py-1 hover:bg-emerald-400/20 transition-colors shrink-0"
                  >
                    ← AI
                  </button>
                ) : (
                  <Search className="w-4 h-4 text-white/25 shrink-0" />
                )}

                <input
                  ref={inputRef}
                  value={query}
                  onChange={handleInputChange}
                  placeholder={mode === 'ai' ? 'Ask another question...' : 'Ask anything or type / for commands...'}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); if (mode === 'ai') setMode('idle'); }}
                    className="text-white/25 hover:text-white/50 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <kbd className="hidden sm:flex items-center text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5 shrink-0">ESC</kbd>
              </form>

              {/* Content */}
              <div className="max-h-[420px] overflow-y-auto">
                {renderContent()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
