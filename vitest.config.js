import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    testTimeout: 10000, // Default timeout for all tests (10 seconds)
    hookTimeout: 10000, // Timeout for hooks
    teardownTimeout: 5000, // Timeout for teardown
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true, // Use single thread to reduce memory usage and prevent OOM errors
        minThreads: 1,
        maxThreads: 1,
      },
    },
    isolate: true, // Isolate each test file to prevent memory leaks
    sequence: {
      shuffle: false, // Disable shuffling to reduce memory overhead
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        '**/*.test.{js,jsx}',
        '**/dist/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
