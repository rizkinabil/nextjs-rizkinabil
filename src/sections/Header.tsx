'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-10 flex justify-center px-4 w-full pointer-events-none">
      <nav className="flex items-center gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur pointer-events-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${active ? 'bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="w-px self-stretch bg-white/15 my-1.5 mx-0.5" />

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-white/70 text-sm font-semibold hover:bg-white/10 hover:text-white transition duration-300"
          aria-label="Open search"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <kbd className="hidden sm:inline text-[10px] opacity-50 border border-white/20 rounded px-1 py-0.5 font-sans">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  );
};
