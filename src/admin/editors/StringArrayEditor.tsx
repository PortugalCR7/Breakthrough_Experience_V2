interface Props {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}

export default function StringArrayEditor({ label, value, onChange }: Props) {
  const update = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...value];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === value.length - 1) return;
    const next = [...value];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  const add = () => onChange([...value, '']);

  return (
    <div className="w-full">
      <label className="block mb-2 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>

      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded p-2 mb-2">
          <span className="text-[10px] font-mono text-neutral-500 w-6 shrink-0">
            {String(i + 1).padStart(2, '0')}.
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 bg-transparent text-stone-200 text-sm outline-none border-b border-neutral-700 focus:border-red-600 pb-0.5 transition-colors"
          />
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => moveUp(i)}
              disabled={i === 0}
              title="Move up"
              className="text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-0.5"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => moveDown(i)}
              disabled={i === value.length - 1}
              title="Move down"
              className="text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-0.5"
            >
              ↓
            </button>
            <button
              type="button"
              onClick={() => remove(i)}
              title="Remove"
              className="text-neutral-500 hover:text-red-500 transition-colors p-0.5 ml-1"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white border border-dashed border-neutral-700 hover:border-neutral-500 rounded px-3 py-1.5 w-full justify-center transition-colors mt-1"
      >
        <span className="text-base leading-none">+</span> Add Item
      </button>
    </div>
  );
}
