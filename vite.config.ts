import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api/auth': {
            target: 'https://api.uinsgd.ac.id/salam/v1/Auth/Login',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api\/auth/, ''),
         },
      },
   },
})
