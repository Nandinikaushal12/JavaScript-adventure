import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Use relative paths for assets to work correctly on Vercel
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html', // Ensure the correct entry point for the build
    },
    assetsInlineLimit: 0, // Ensure assets are not inlined and are properly referenced
  },
});