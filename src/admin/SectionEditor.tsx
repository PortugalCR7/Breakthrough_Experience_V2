import React, { useState, useEffect, useCallback } from 'react';
import { ALL_SECTION_DEFAULTS } from '../data/pageContent';
import { SECTION_SCHEMA } from './sectionSchema';
import { useUpdateSection, CmsNotConfiguredError } from '../hooks/useUpdateSection';
import type { FieldDef } from './editors/types';
import TextInput from './editors/TextInput';
import ImageInput from './editors/ImageInput';
import NumberInput from './editors/NumberInput';
import BooleanInput from './editors/BooleanInput';
import StringArrayEditor from './editors/StringArrayEditor';
import ObjectEditor from './editors/ObjectEditor';
import ObjectArrayEditor from './editors/ObjectArrayEditor';
import RichTextEditor from './editors/RichTextEditor';

interface Props {
  sectionKey: string;
  onBack: () => void;
}

function toLabel(key: string) {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderField(
  field: FieldDef,
  formState: Record<string, unknown>,
  setFormState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>,
  sectionKey: string
) {
  const update = (val: unknown) =>
    setFormState((prev) => ({ ...prev, [field.key]: val }));

  switch (field.type) {
    case 'text':
      return (
        <TextInput
          label={field.label}
          value={(formState[field.key] as string) ?? ''}
          onChange={update}
        />
      );
    case 'image':
      return (
        <ImageInput
          label={field.label}
          value={(formState[field.key] as string) ?? ''}
          onChange={update}
          folder={sectionKey}
        />
      );
    case 'number':
      return (
        <NumberInput
          label={field.label}
          value={(formState[field.key] as number) ?? 0}
          onChange={update}
        />
      );
    case 'boolean':
      return (
        <BooleanInput
          label={field.label}
          value={(formState[field.key] as boolean) ?? false}
          onChange={update}
        />
      );
    case 'richtext':
      return (
        <RichTextEditor
          label={field.label}
          value={(formState[field.key] as string) ?? ''}
          onChange={update}
        />
      );
    case 'string_array':
      return (
        <StringArrayEditor
          label={field.label}
          value={(formState[field.key] as string[]) ?? []}
          onChange={update}
        />
      );
    case 'object':
      return (
        <ObjectEditor
          label={field.label}
          value={(formState[field.key] as Record<string, unknown>) ?? {}}
          fields={field.fields ?? []}
          onChange={update}
          folder={sectionKey}
        />
      );
    case 'object_array':
      return (
        <ObjectArrayEditor
          label={field.label}
          value={(formState[field.key] as Record<string, unknown>[]) ?? []}
          fields={field.fields ?? []}
          onChange={update}
          itemLabel={field.label.replace(/s$/, '')}
          folder={sectionKey}
        />
      );
    default:
      return null;
  }
}

type ToastState = { visible: boolean; message: string; type: 'success' | 'error' };

export default function SectionEditor({ sectionKey, onBack }: Props) {
  const fields = SECTION_SCHEMA[sectionKey] ?? [];
  const defaults = (ALL_SECTION_DEFAULTS[sectionKey] ?? {}) as Record<string, unknown>;

  const [formState, setFormState] = useState<Record<string, unknown>>(defaults);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: '', type: 'success' });

  const { update, state: updateState, reset: resetUpdate } = useUpdateSection<Record<string, unknown>>(sectionKey);

  // Re-initialize when the section key changes
  useEffect(() => {
    setFormState((ALL_SECTION_DEFAULTS[sectionKey] ?? {}) as Record<string, unknown>);
  }, [sectionKey]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: '', type: 'success' }), 3000);
  };

  const saveSection = useCallback(async () => {
    try {
      await update(formState);
      showToast(`"${toLabel(sectionKey)}" saved.`);
    } catch (err) {
      if (err instanceof CmsNotConfiguredError) {
        showToast('CMS not configured — check Supabase credentials.', 'error');
      } else {
        showToast((err as Error).message || 'Save failed. Please try again.', 'error');
      }
    } finally {
      resetUpdate();
    }
  }, [sectionKey, formState, update, resetUpdate]);

  if (fields.length === 0) {
    return (
      <div className="text-zinc-500 text-sm p-6">
        No schema defined for section <code className="font-mono text-zinc-400">{sectionKey}</code>.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="text-zinc-500 hover:text-white transition-colors text-sm font-mono flex items-center gap-1.5"
        >
          ← Back
        </button>
        <div>
          <h2 className="text-white text-lg font-light tracking-wider">{toLabel(sectionKey)}</h2>
          <p className="text-zinc-600 font-mono text-[10px]">{sectionKey}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-6 pb-24">
        {fields.map((field) => (
          <div key={field.key}>
            {renderField(field, formState, setFormState, sectionKey)}
          </div>
        ))}
      </div>

      {/* Save bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
        <p className="text-zinc-600 text-xs font-mono">
          Saves to Supabase — changes reflect on the public site immediately.
        </p>
        <button
          type="button"
          onClick={saveSection}
          disabled={updateState.updating}
          className="bg-red-700 hover:bg-red-600 disabled:opacity-40 text-white text-sm font-mono tracking-wider px-6 py-2 rounded transition-colors"
        >
          {updateState.updating ? 'SAVING…' : 'SAVE'}
        </button>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div
          role="status"
          className={`fixed bottom-20 right-6 border text-white text-sm px-4 py-2.5 rounded shadow-lg z-20 transition-opacity ${
            toast.type === 'error'
              ? 'bg-red-900/90 border-red-700'
              : 'bg-zinc-800 border-zinc-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
