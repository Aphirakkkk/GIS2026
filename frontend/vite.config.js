import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'lucide-react']
  }
})
