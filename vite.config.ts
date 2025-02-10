import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    server: {
      host: '0.0.0.0',
      port: process.env.PORT ? Number(process.env.PORT) : 5173,
      open: false
    },
    preview: {
      allowedHosts: ['swipe-candidate-search.onrender.com']
    },
    plugins: [react()]
  };
});