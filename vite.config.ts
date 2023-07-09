/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://www.robinwieruch.de/vitest-react-testing-library/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // …
    },
  },
});
