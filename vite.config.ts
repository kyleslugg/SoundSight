import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import express from './express-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000/',
      '/spotify': 'http://localhost:3000/'
    }
  }
});
