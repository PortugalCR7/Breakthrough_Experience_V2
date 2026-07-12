import React, { useRef, useState } from 'react';
import { uploadImage, ImageUploadError } from '../../lib/uploadImage';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  folder?: string;
}

export default function ImageInput({ label, value, onChange, folder = 'uploads' }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      setImgError(false);
    } catch (err) {
      if (err instanceof ImageUploadError) {
        setError(err.message);
      } else {
        setError('Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
      // Reset so the same file can be re-selected after an error
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block mb-1 uppercase text-[10px] tracking-widest text-neutral-400 font-mono">
        {label}
      </label>

      {/* Thumbnail preview */}
      {value && (
        <div className="mb-2">
          {imgError ? (
            <div className="h-24 w-full bg-neutral-800 border border-neutral-700 rounded flex items-center justify-center">
              <span className="text-neutral-600 text-xs font-mono">preview unavailable</span>
            </div>
          ) : (
            <img
              src={value}
              alt="preview"
              onError={() => setImgError(true)}
              className="h-24 w-auto max-w-full object-cover rounded border border-neutral-700 bg-neutral-900"
            />
          )}
        </div>
      )}

      {/* Hidden file input + visible button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-stone-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm px-3 py-1.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-red-600"
      >
        {uploading ? (
          <>
            <span className="inline-block w-3 h-3 border-2 border-neutral-600 border-t-red-500 rounded-full animate-spin" />
            Uploading…
          </>
        ) : value ? (
          'Replace Image'
        ) : (
          'Choose Image'
        )}
      </button>

      {/* Inline error */}
      {error && (
        <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>
      )}

      {/* Raw URL for debugging */}
      {value && (
        <p className="mt-1.5 text-[10px] font-mono text-neutral-600 break-all leading-snug">
          {value}
        </p>
      )}
    </div>
  );
}
