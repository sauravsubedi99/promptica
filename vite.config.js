import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'  // Import the Vite plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
  proxy: {
    '/users': 'http://localhost:8000',
    '/conversations': 'http://localhost:8000',
  }
}
})