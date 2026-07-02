import { ALL_SECTION_DEFAULTS } from '../data/pageContent';

const SECTION_KEYS = Object.keys(ALL_SECTION_DEFAULTS);

function toLabel(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-white text-lg font-light tracking-wider">Content Sections</h2>
        <p className="text-zinc-500 text-xs mt-1">Select a section to edit its content. (Section editors coming in Round 3.)</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {SECTION_KEYS.map((key, i) => (
          <div
            key={key}
            className="border border-zinc-800 rounded bg-zinc-900 px-4 py-4 hover:border-zinc-600 hover:bg-zinc-800 transition-colors cursor-default group"
          >
            <p className="text-[10px] text-zinc-600 tracking-[0.15em] uppercase mb-1 font-mono">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-white text-sm font-light leading-snug">{toLabel(key)}</p>
            <p className="text-zinc-600 text-[10px] font-mono mt-1 group-hover:text-zinc-400 transition-colors">{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
