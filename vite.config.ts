import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { globSync } from 'glob';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Get all HTML files as entry points
  const htmlFiles = globSync('**/*.html', { ignore: ['node_modules/**', 'dist/**'] });
  const input = {};
  htmlFiles.forEach(file => {
    // Skip index.html in root as it's the default
    if (file === 'index.html') {
        input['main'] = path.resolve(__dirname, 'index.html');
    } else {
        const name = file.replace(/\.html$/, '').replace(/\//g, '_');
        input[name] = path.resolve(__dirname, file);
    }
  });

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: input
      }
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 3000,
      host: '0.0.0.0'
    },
  };
});
