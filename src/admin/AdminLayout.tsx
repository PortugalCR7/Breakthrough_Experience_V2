import type { ReactNode } from 'react';
import { useAdminAuth } from './useAdminAuth';
import { SECTIONS } from './sections';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection?: string;
}

export default function AdminLayout({ children, activeSection }: AdminLayoutProps) {
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">Admin</span>
          <span className="text-zinc-700">·</span>
          <span className="text-white text-sm tracking-widest uppercase font-light">BREAKTHROUGH</span>
        </div>
        <button
          onClick={() => logout()}
          className="text-xs text-zinc-500 hover:text-white tracking-wider uppercase transition-colors"
        >
          Sign Out
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-zinc-800 overflow-y-auto shrink-0">
          <nav className="py-4">
            <p className="px-4 mb-2 text-[10px] tracking-[0.2em] text-zinc-600 uppercase">Sections</p>
            {SECTIONS.map(({ key, label }) => (
              <a
                key={key}
                href={`#${key}`}
                aria-current={activeSection === key ? 'page' : undefined}
                className={[
                  'block px-4 py-2 text-xs tracking-wide transition-colors',
                  activeSection === key
                    ? 'text-white bg-zinc-800'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900',
                ].join(' ')}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
