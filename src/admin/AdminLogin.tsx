import { useState, type FormEvent } from 'react';

interface AdminLoginProps {
  onLogin: (credentials: { email?: string; password: string }) => Promise<boolean>;
  error: string | null;
  mode: 'supabase' | 'passphrase';
}

export default function AdminLogin({ onLogin, error, mode }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const credentials = mode === 'supabase' ? { email, password } : { password };
    await onLogin(credentials);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.2em] text-zinc-500 uppercase mb-2">Admin Panel</p>
          <h1 className="text-white text-2xl font-light tracking-widest uppercase">BREAKTHROUGH</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'supabase' && (
            <div>
              <label htmlFor="email" className="block text-xs text-zinc-400 mb-1.5 tracking-wider uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-xs text-zinc-400 mb-1.5 tracking-wider uppercase">
              {mode === 'supabase' ? 'Password' : 'Passphrase'}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'supabase' ? 'current-password' : 'off'}
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 rounded focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          {error && (
            <p aria-live="polite" className="text-red-400 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black text-xs tracking-[0.2em] uppercase py-3 rounded hover:bg-zinc-200 disabled:opacity-40 transition-colors"
          >
            {submitting ? 'Verifying…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
