import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { DEFAULT_SITE_URL, seoMetaPlugin } from './vite-plugins/SeoMetaPlugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');

  return {
    plugins: [react(), seoMetaPlugin(env.VITE_SITE_URL || DEFAULT_SITE_URL)],
    server: {
      port: 3001,
      open: false
    },
    build: {
      emptyOutDir: false
    }
  };
});
