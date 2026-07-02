interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function TextInput({ label, value, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="block mb-1 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutral-900 text-stone-200 border border-neutral-700 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-red-600 transition-shadow"
      />
    </div>
  );
}
