interface Props {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function BooleanInput({ label, value, onChange }: Props) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-red-600 ${
          value ? 'bg-red-600' : 'bg-neutral-700'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
