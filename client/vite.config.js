import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:true,
    port:5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://mtl-server:3000',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
