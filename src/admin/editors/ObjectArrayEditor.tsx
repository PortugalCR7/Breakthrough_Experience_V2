import { useState } from 'react';
import TextInput from './TextInput';
import ImageInput from './ImageInput';
import NumberInput from './NumberInput';
import BooleanInput from './BooleanInput';
import RichTextEditor from './RichTextEditor';
import StringArrayEditor from './StringArrayEditor';
import ObjectEditor from './ObjectEditor';
import { FieldDef } from './types';

interface Props {
  label: string;
  value: Record<string, any>[];
  fields: FieldDef[];
  onChange: (v: Record<string, any>[]) => void;
  itemLabel?: string;
  folder?: string;
}

function createEmpty(fields: FieldDef[]): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const f of fields) {
    switch (f.type) {
      case 'text':
      case 'richtext':
      case 'image':
        obj[f.key] = '';
        break;
      case 'number':
        obj[f.key] = 0;
        break;
      case 'boolean':
        obj[f.key] = false;
        break;
      case 'string_array':
        obj[f.key] = [];
        break;
      case 'object':
        obj[f.key] = {};
        break;
      case 'object_array':
        obj[f.key] = [];
        break;
    }
  }
  return obj;
}

function renderField(
  field: FieldDef,
  value: Record<string, any>,
  onChange: (v: Record<string, any>) => void,
  folder?: string
) {
  const update = (key: string, val: any) => onChange({ ...value, [key]: val });

  switch (field.type) {
    case 'text':
      return (
        <TextInput
          label={field.label}
          value={value[field.key] ?? ''}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'image':
      return (
        <ImageInput
          label={field.label}
          value={value[field.key] ?? ''}
          onChange={(v) => update(field.key, v)}
          folder={folder}
        />
      );
    case 'number':
      return (
        <NumberInput
          label={field.label}
          value={value[field.key] ?? 0}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'boolean':
      return (
        <BooleanInput
          label={field.label}
          value={value[field.key] ?? false}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'richtext':
      return (
        <RichTextEditor
          label={field.label}
          value={value[field.key] ?? ''}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'string_array':
      return (
        <StringArrayEditor
          label={field.label}
          value={value[field.key] ?? []}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'object':
      return (
        <ObjectEditor
          label={field.label}
          value={value[field.key] ?? {}}
          fields={field.fields ?? []}
          onChange={(v) => update(field.key, v)}
        />
      );
    case 'object_array':
      return (
        <ObjectArrayEditor
          label={field.label}
          value={value[field.key] ?? []}
          fields={field.fields ?? []}
          onChange={(v) => update(field.key, v)}
        />
      );
    default:
      return null;
  }
}

export default function ObjectArrayEditor({
  label,
  value,
  fields,
  onChange,
  itemLabel = 'Item',
  folder,
}: Props) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleExpand = (i: number) => {
    setExpandedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const updateItem = (i: number, updated: Record<string, any>) => {
    const next = [...value];
    next[i] = updated;
    onChange(next);
  };

  const removeItem = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
    setExpandedIndices((prev) => {
      const next = new Set<number>();
      prev.forEach((n) => { if (n < i) next.add(n); else if (n > i) next.add(n - 1); });
      return next;
    });
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const next = [...value];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    onChange(next);
  };

  const moveDown = (i: number) => {
    if (i === value.length - 1) return;
    const next = [...value];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    onChange(next);
  };

  const add = () => {
    const newIndex = value.length;
    onChange([...value, createEmpty(fields)]);
    setExpandedIndices((prev) => new Set([...prev, newIndex]));
  };

  return (
    <div className="w-full">
      <label className="block mb-2 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>

      {value.map((item, i) => {
        const isExpanded = expandedIndices.has(i);
        return (
          <div
            key={i}
            className="bg-neutral-900/50 border border-neutral-800 rounded-lg mb-3 overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-3 py-2 bg-neutral-900">
              <button
                type="button"
                onClick={() => toggleExpand(i)}
                className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <svg
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-mono text-[10px] text-neutral-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium">{itemLabel}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  title="Move up"
                  className="text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1 text-sm"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(i)}
                  disabled={i === value.length - 1}
                  title="Move down"
                  className="text-neutral-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors p-1 text-sm"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  title="Delete"
                  className="text-red-500 hover:text-red-400 transition-colors p-1 text-sm ml-1"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Card body */}
            {isExpanded && (
              <div className="p-4 flex flex-col gap-4">
                {fields.map((field) => (
                  <div key={field.key}>
                    {renderField(field, item, (updated) => updateItem(i, updated), folder)}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white border border-dashed border-neutral-700 hover:border-neutral-500 rounded px-3 py-1.5 w-full justify-center transition-colors"
      >
        <span className="text-base leading-none">+</span> Add {itemLabel}
      </button>
    </div>
  );
}
