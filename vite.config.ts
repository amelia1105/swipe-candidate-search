import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config();

export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  define: {
    'import.meta.env': JSON.stringify(process.env)
  }
});
