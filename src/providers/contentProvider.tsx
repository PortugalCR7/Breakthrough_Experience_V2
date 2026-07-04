import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import supabase from '../lib/supabaseClient';
import { ScrollTrigger } from '../motion/gsap';

interface ContentContextValue {
  sections: Record<string, any>;
  loading: boolean;
  refetch: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue>({
  sections: {},
  loading: true,
  refetch: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const fetchSections = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('page_sections')
        .select('section_key, content')
        .order('updated_at', { ascending: true });

      if (error) {
        console.warn('Failed to fetch sections:', error.message);
        setLoading(false);
        return;
      }

      if (data) {
        const map: Record<string, any> = {};
        data.forEach((row: { section_key: string; content: any }) => {
          map[row.section_key] = row.content;
        });
        setSections(map);
      }
    } catch (err) {
      console.warn('Content fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  /**
   * Re-measure scroll-scrubbed triggers whenever CMS content lands or changes.
   *
   * useSection() renders each component's hardcoded fallback first, then
   * swaps in the fetched Supabase row once fetchSections() resolves (and
   * again on any later refetch(), e.g. a live admin edit). Word-scrub
   * headlines (useWordScrub, used by AnchorQuote, MenIMeet, and ~12 other
   * sections) measure their ScrollTrigger start/end against whatever text is
   * on screen at mount time. If the real content differs in length from the
   * fallback -- or from whatever was previously live -- that swap shifts
   * layout *after* the trigger positions were already captured, leaving
   * trailing words stuck at their dim "unread" resting colour once scroll
   * runs past the now-stale end point.
   *
   * This is the same failure mode LenisProvider already guards against for
   * theme toggles (see its data-theme MutationObserver + scheduleRefresh).
   * This effect covers the content-load/refetch transition the same way,
   * with the same double-rAF + delayed-timeout debounce: let React commit
   * the swapped-in content and let the browser apply the resulting layout,
   * then re-measure every trigger against the settled paint.
   */
  const refreshHandles = useRef({ raf1: 0, raf2: 0, timer: 0 });

  useEffect(() => {
    if (loading) return; // wait until content has actually landed (or failed)
    if (typeof window === 'undefined') return;

    const handles = refreshHandles.current;
    cancelAnimationFrame(handles.raf1);
    cancelAnimationFrame(handles.raf2);
    window.clearTimeout(handles.timer);

    const doRefresh = () => ScrollTrigger.refresh();

    handles.raf1 = requestAnimationFrame(() => {
      handles.raf2 = requestAnimationFrame(doRefresh);
    });
    // Belt-and-suspenders for slower cases (fonts/images still settling, a
    // refetch() firing mid-scroll, etc.) — refresh() is idempotent, so a
    // second call is free.
    handles.timer = window.setTimeout(doRefresh, 300);

    return () => {
      cancelAnimationFrame(handles.raf1);
      cancelAnimationFrame(handles.raf2);
      window.clearTimeout(handles.timer);
    };
  }, [sections, loading]);

  return (
    <ContentContext.Provider value={{ sections, loading, refetch: fetchSections }}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * useSection — the primary hook for components to consume CMS content.
 *
 * Returns the database content for the given section key, deeply merged
 * with the provided fallback. If no database content exists (Supabase
 * unavailable, section not found, or still loading), returns the fallback.
 */
export function useSection<T>(key: string, fallback: T): T {
  const { sections } = useContext(ContentContext);
  const dbContent = sections[key];

  if (!dbContent) return fallback;

  return { ...fallback, ...dbContent } as T;
}

/**
 * useContentContext — exposes the full context for admin components
 * that need refetch() or loading state.
 */
export function useContentContext() {
  return useContext(ContentContext);
}
