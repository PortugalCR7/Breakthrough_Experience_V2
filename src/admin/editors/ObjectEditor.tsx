import TextInput from './TextInput';
import ImageInput from './ImageInput';
import NumberInput from './NumberInput';
import BooleanInput from './BooleanInput';
import RichTextEditor from './RichTextEditor';
import StringArrayEditor from './StringArrayEditor';
import ObjectArrayEditor from './ObjectArrayEditor';
import { FieldDef } from './types';

interface Props {
  label: string;
  value: Record<string, any>;
  fields: FieldDef[];
  onChange: (v: Record<string, any>) => void;
  folder?: string;
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

export default function ObjectEditor({ label, value, fields, onChange, folder }: Props) {
  return (
    <div className="w-full border-l-2 border-red-600 pl-4">
      <p className="uppercase text-[10px] tracking-widest text-neutral-400 font-mono mb-3">
        {label}
      </p>
      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            {renderField(field, value, onChange, folder)}
          </div>
        ))}
      </div>
    </div>
  );
}
