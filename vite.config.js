import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Настраиваем прокси для API
      '/tech-sup': {
        target: 'http://localhost:5000', // Адрес вашего бэкенда
        rewrite: (path) => path.replace(/^\/tech-sup/, '/api/employees'),
        changeOrigin: true,
      },
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.jpeg', '**/*.JPEG'],
});
