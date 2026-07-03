import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import supabase from '../lib/supabaseClient';

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
        .order('display_order', { ascending: true });

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
