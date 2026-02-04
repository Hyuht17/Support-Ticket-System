import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }), 
    tailwindcss(),
  ],
  server: {
    host: true,
        port: 5173,
        watch: {
            usePolling: true
        },
    proxy: {
      '/api': {
        target: 'http://nginx:80',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
