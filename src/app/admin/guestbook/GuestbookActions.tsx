'use client';

import { useState } from 'react';

type Entry = {
  id: string;
  name: string;
  position: string;
  text: string;
  created_at: string;
};

export function GuestbookList({ initialEntries }: { initialEntries: Entry[] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [loading, setLoading] = useState<Record<string, 'approve' | 'reject'>>({});

  async function act(id: string, action: 'approve' | 'reject') {
    setLoading((prev) => ({ ...prev, [id]: action }));
    try {
      const res = await fetch(`/api/guestbook/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((e) => e.id !== id));
      }
    } finally {
      setLoading((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center border border-gray-700 rounded-2xl">
        <p className="text-white/40">All clear! No pending submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 bg-gray-800 border border-gray-700 rounded-2xl"
        >
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold">{entry.name}</p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                pending
              </span>
            </div>
            <p className="text-sm text-gray-400">{entry.position}</p>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">{entry.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              Submitted{' '}
              {new Date(entry.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => act(entry.id, 'approve')}
              disabled={!!loading[entry.id]}
              className="px-4 py-2 text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              {loading[entry.id] === 'approve' ? '…' : 'Approve'}
            </button>
            <button
              onClick={() => act(entry.id, 'reject')}
              disabled={!!loading[entry.id]}
              className="px-4 py-2 text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              {loading[entry.id] === 'reject' ? '…' : 'Reject'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
