import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/JavaScript-adventure/', // Set the base to your repository name for GitHub Pages
  plugins: [react()],
  build: {
    rollupOptions: {
      input: './index.html', // Ensure the correct entry point for the build
    },
  },
});