import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',                 // asegura rutas absolutas correctas en producción
  build: {
    outDir: 'dist',          // carpeta de salida del build (Vercel sirve esto)
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
