import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

const apiTarget = process.env.VITE_API_URL || 'http://localhost:5001';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd', '@ant-design/icons'],
          'leaflet-vendor': ['leaflet', 'react-leaflet'],
          'gsap-vendor': ['gsap'],
          'swiper-vendor': ['swiper'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.jpeg', '**/*.JPEG'],
});