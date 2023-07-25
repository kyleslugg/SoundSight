import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import express from './express-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('src/server/server.ts')]
});
