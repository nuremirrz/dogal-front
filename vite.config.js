import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {    
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.jpeg', '**/*.JPEG'],
});
