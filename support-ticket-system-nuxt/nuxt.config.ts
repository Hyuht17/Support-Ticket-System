import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    './app/assets/css/main.css',
    'vue-toastification/dist/index.css'
  ],
  modules: [
    '@nuxt/icon'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  } 
})
