// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Important for relative paths in production
  build: {
    rollupOptions: {
      external: ['react-router-dom'],  // Add this line if Vercel is not resolving it
    },
  },
  plugins: [react()],
})
