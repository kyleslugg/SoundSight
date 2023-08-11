import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/auth': 'http://localhost:3000/',
      '/spotify': 'http://localhost:3000/'
    }
  }
});
