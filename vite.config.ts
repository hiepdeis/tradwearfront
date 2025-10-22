import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ⚙️ Cấu hình server khi chạy dev
  server: {
    port: 5173, // hoặc cổng bạn muốn
    proxy: {
      '/api': {
        target: 'https://tradwear-be.up.railway.app', // backend của bạn
        changeOrigin: true,
        secure: true,
      },
      '/auth': {
        target: 'https://tradwear-be.up.railway.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },

  // ⚙️ Cấu hình build
  build: {
    outDir: 'dist',
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
