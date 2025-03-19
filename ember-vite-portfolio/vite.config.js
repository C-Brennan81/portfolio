// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-router-dom']
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'] // helps Vite resolve this on Vercel
    }
  }
});
