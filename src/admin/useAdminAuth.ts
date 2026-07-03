import { useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabaseClient';

export interface AdminAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: { email?: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  mode: 'supabase' | 'passphrase';
}

// Passphrase for offline/development mode.
// In production, Supabase Auth replaces this entirely.
const DEV_PASSPHRASE = 'breakthrough-admin-2026';

export function useAdminAuth(): AdminAuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mode: 'supabase' | 'passphrase' = supabase ? 'supabase' : 'passphrase';

  useEffect(() => {
    const checkSession = async () => {
      if (mode === 'supabase' && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          setIsAuthenticated(!!session);
        } catch {
          setIsAuthenticated(false);
        }
      } else {
        const stored = sessionStorage.getItem('admin_auth');
        setIsAuthenticated(stored === 'true');
      }
      setLoading(false);
    };

    checkSession();

    if (mode === 'supabase' && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setIsAuthenticated(!!session);
        }
      );
      return () => subscription.unsubscribe();
    }
  }, [mode]);

  const login = useCallback(async (credentials: { email?: string; password: string }): Promise<boolean> => {
    setError(null);

    if (mode === 'supabase' && supabase) {
      if (!credentials.email) {
        setError('Email is required for Supabase authentication.');
        return false;
      }
      try {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        if (authError) {
          setError(authError.message);
          return false;
        }
        setIsAuthenticated(true);
        return true;
      } catch {
        setError('Authentication failed. Please try again.');
        return false;
      }
    } else {
      if (credentials.password === DEV_PASSPHRASE) {
        sessionStorage.setItem('admin_auth', 'true');
        setIsAuthenticated(true);
        return true;
      } else {
        setError('Invalid passphrase.');
        return false;
      }
    }
  }, [mode]);

  const logout = useCallback(async () => {
    if (mode === 'supabase' && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  }, [mode]);

  return { isAuthenticated, loading, error, login, logout, mode };
}
