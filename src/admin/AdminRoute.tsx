import type { ReactNode } from 'react';
import { useAdminAuth } from './useAdminAuth';
import AdminLogin from './AdminLogin';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, loading, error, login, mode } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <span className="text-zinc-600 text-xs tracking-widest uppercase animate-pulse">Loading…</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} error={error} mode={mode} />;
  }

  return <>{children}</>;
}
