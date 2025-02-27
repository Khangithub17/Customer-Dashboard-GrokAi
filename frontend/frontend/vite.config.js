import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          body {
            background-color: black;
            color: white;
          }
          h1 {
            background: linear-gradient(90deg, purple, pink);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: textAnimation 3s infinite;
            text-transform: uppercase;
          }
          @keyframes textAnimation {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `,
      },
    },
  },
});