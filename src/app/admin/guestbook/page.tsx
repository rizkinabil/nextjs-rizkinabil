import { getPendingGuestbook } from '@/lib/database-service';
import { GuestbookList } from './GuestbookActions';

export const dynamic = 'force-dynamic';

export default async function GuestbookModerationPage() {
  const pending = await getPendingGuestbook();

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-3">
            <a href="/admin" className="text-white/40 hover:text-white text-sm transition-colors">
              Dashboard
            </a>
            <span className="text-white/20">/</span>
            <h1 className="text-white font-medium text-sm">Guest Book Moderation</h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Pending Submissions</h2>
          <p className="text-gray-400 text-sm mt-1">
            {pending.length === 0
              ? 'No pending submissions'
              : `${pending.length} submission${pending.length > 1 ? 's' : ''} awaiting review`}
          </p>
        </div>

        <GuestbookList initialEntries={pending} />
      </main>
    </div>
  );
}
