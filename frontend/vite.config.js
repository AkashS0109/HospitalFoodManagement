import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Your frontend development server port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // Disable SSL verification if backend uses HTTP
      },
    },
  },
});
