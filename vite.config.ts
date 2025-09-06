import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from './vite-plugins/compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/',
  plugins: [
    react(),
    mode === 'production' && visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    mode === 'production' && viteCompression,
  ].filter(Boolean),
  resolve: {
    alias: [
      { 
        find: "@", 
        replacement: path.resolve(__dirname, "./src") 
      },
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    sourcemap: mode === 'development',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: [
            'framer-motion',
            'lucide-react',
            'react-markdown',
            'remark-gfm',
            'rehype-raw',
            '@tanstack/react-query',
            '@headlessui/react',
            'react-helmet-async',
            'react-icons',
            'react-syntax-highlighter',
            'react-share',
            'react-toastify',
            'react-dropzone',
            'react-player',
            'react-slick',
            'slick-carousel',
            // add more as needed
          ],
        },
        // Ensure consistent chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return `assets/media/[name]-[hash][extname]`;
          }
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/(png|jpe?g|svg|gif|webp|avif)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          if (/(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/media/[name]-[hash][extname]`;
        },
      },
    },
  },
  server: {
    host: true,
    port: 5174,
    proxy: {
      '/process_booking.php': 'http://localhost:8000',
      '/process_project.php': 'http://localhost:8000',
      '/process_contact.php': 'http://localhost:8000',
    },
  },
}));
