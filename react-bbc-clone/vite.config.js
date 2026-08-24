import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  optimizeDeps: {
    // Wir sagen Vite, dass er diese speziellen Binär-Dateien ignorieren soll
    exclude: [
      '@tailwindcss/oxide', 
      '@tailwindcss/oxide-win32-x64-msvc'
    ]
  }
})