import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),{'/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }},],
})

 // Proxy all API requests starting with /api to the backend server
 