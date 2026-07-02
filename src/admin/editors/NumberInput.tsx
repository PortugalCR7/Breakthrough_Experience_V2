interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

export default function NumberInput({ label, value, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="block mb-1 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const parsed = parseFloat(e.target.value);
          onChange(isNaN(parsed) ? 0 : parsed);
        }}
        className="w-full bg-neutral-900 text-stone-200 border border-neutral-700 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-600 transition-shadow"
      />
    </div>
  );
}
