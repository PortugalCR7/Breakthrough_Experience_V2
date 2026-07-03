import { useState, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import { sanitizeString } from '../utils/sanitizeHtml';
import { useContentContext } from '../providers/contentProvider';

/**
 * Thrown when useUpdateSection is called but Supabase credentials are not
 * configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY absent).
 * Catch this in SectionEditor and display "CMS not configured" to the user.
 */
export class CmsNotConfiguredError extends Error {
  constructor() {
    super('Supabase credentials are not configured — CMS writes are unavailable.');
    this.name = 'CmsNotConfiguredError';
  }
}

/**
 * Recursively sanitizes all string values in a content object before write.
 * Ensures rich-text / HTML fields are clean at rest in Supabase, not just on render.
 */
function sanitizeContent<T>(data: T): T {
  if (typeof data === 'string') return sanitizeString(data) as unknown as T;
  if (Array.isArray(data)) return data.map(sanitizeContent) as unknown as T;
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).map(([k, v]) => [k, sanitizeContent(v)])
    ) as T;
  }
  return data;
}

export interface UpdateSectionState {
  updating: boolean;
  error: Error | null;
  success: boolean;
}

/**
 * useUpdateSection — write/persist hook for CMS section content.
 *
 * Requires an authenticated Supabase session. The RLS policy on `page_sections`
 * allows INSERT/UPDATE only for the `authenticated` role — anon writes are rejected
 * by Postgres and surfaced in `state.error`.
 *
 * Behavior when Supabase is not configured (no env vars):
 *   `update()` sets `state.error` to a `CmsNotConfiguredError` AND throws it.
 *   Callers can either await+catch or watch `state.error` — both work.
 *
 * ─── Usage in SectionEditor ─────────────────────────────────────────────────
 *
 *   import { useUpdateSection, CmsNotConfiguredError } from '../hooks/useUpdateSection';
 *
 *   // Drop-in replacement for the stubbed saveSection():
 *   const { update, state, reset } = useUpdateSection<HeroContent>('hero');
 *
 *   const handleSave = async () => {
 *     try {
 *       await update(editedContent);
 *       showToast({ type: 'success', message: 'Section saved.' });
 *     } catch (err) {
 *       if (err instanceof CmsNotConfiguredError) {
 *         showToast({ type: 'error', message: 'CMS not configured.' });
 *       } else {
 *         showToast({ type: 'error', message: (err as Error).message });
 *       }
 *     } finally {
 *       reset(); // clear success/error state after toast is shown
 *     }
 *   };
 *
 *   // Or watch state reactively (e.g. for a spinner):
 *   if (state.updating) return <Spinner />;
 *
 * ────────────────────────────────────────────────────────────────────────────
 */
export function useUpdateSection<T extends Record<string, unknown>>(key: string): {
  update: (data: T) => Promise<void>;
  state: UpdateSectionState;
  reset: () => void;
} {
  const { refetch } = useContentContext();
  const [state, setState] = useState<UpdateSectionState>({
    updating: false,
    error: null,
    success: false,
  });

  const update = useCallback(async (data: T): Promise<void> => {
    if (!supabase) {
      const err = new CmsNotConfiguredError();
      setState({ updating: false, error: err, success: false });
      throw err;
    }

    setState({ updating: true, error: null, success: false });

    const sanitized = sanitizeContent(data);

    const { error: dbError } = await supabase
      .from('page_sections')
      .upsert(
        { section_key: key, content: sanitized },
        { onConflict: 'section_key' }
      );

    if (dbError) {
      // RLS rejection from an unauthenticated session surfaces here.
      const err = new Error(dbError.message);
      setState({ updating: false, error: err, success: false });
      throw err;
    }

    // Invalidate the ContentProvider cache so reads immediately reflect the update.
    await refetch();
    setState({ updating: false, error: null, success: true });
  }, [key, refetch]);

  const reset = useCallback(() => {
    setState({ updating: false, error: null, success: false });
  }, []);

  return { update, state, reset };
}
