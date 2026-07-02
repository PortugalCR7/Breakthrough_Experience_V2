import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        // Multi-page build: the main experience plus the three standalone legal
        // pages. Each legal entry ships its own crawlable static HTML (baked-in
        // title / canonical / meta) and mounts the shared LegalPage React app.
        input: {
          main: path.resolve(__dirname, 'index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          disclaimer: path.resolve(__dirname, 'disclaimer/index.html'),
          // Standalone 404 shell → emits dist/404.html, which Vercel serves for
          // any unmatched route with a real HTTP 404 status.
          notFound: path.resolve(__dirname, '404.html'),
          // Admin panel — separate MPA entry; never indexed (noindex in HTML).
          admin: path.resolve(__dirname, 'src/admin/index.html'),
        },
        output: {
          // Split stable third-party libs into their own chunk so app-code edits
          // don't invalidate the (large, rarely-changing) vendor bundle on repeat
          // visits. Same modules load on first paint — two parallel
          // (HTTP/2-multiplexed) requests instead of one.
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
