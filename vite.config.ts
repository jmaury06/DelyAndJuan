import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Mejorar compatibilidad con navegadores antiguos
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13'],
    // Optimizar para producción con esbuild (más rápido y sin dependencias extra)
    minify: 'esbuild' as const,
    // Mejorar carga en móviles
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-toast'],
        },
      },
    },
  },
  // Optimizaciones adicionales
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
