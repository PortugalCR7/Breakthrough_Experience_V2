import { useState, useEffect, useCallback } from 'react';

// Stub — interface intentionally mirrors AG 3's cms/infrastructure implementation
// so consuming components (AdminLogin, AdminRoute) are merge-compatible.
// This version runs passphrase-only; AG 3's version adds Supabase Auth on top.

export interface AdminAuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: { email?: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  mode: 'supabase' | 'passphrase';
}

const DEV_PASSPHRASE = 'breakthrough-admin-2026';

export function useAdminAuth(): AdminAuthState {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mode: 'supabase' | 'passphrase' = 'passphrase';

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_auth');
    setIsAuthenticated(stored === 'true');
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials: { email?: string; password: string }): Promise<boolean> => {
    setError(null);
    if (credentials.password === DEV_PASSPHRASE) {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    setError('Invalid passphrase.');
    return false;
  }, []);

  const logout = useCallback(async () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, loading, error, login, logout, mode };
}
