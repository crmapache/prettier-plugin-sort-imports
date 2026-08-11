import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URL = process.env.API_URL || 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': API_URL,
    },
  },
})
