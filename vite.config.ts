/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const clientPort = Number(env.VITE_CLIENT_PORT ?? 8081)
  const backendPort = Number(env.VITE_BACKEND_PORT ?? 4001)

  return {
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
    dedupe: ['three'],
  },
  server: {
    port: clientPort,
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    proxy: {
      '/socket.io': {
        target: `http://localhost:${backendPort}`,
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 5000,
    minify: false, // TEMPORARY: Disable minification for better debugging
    rollupOptions: {
      output: {
        // manualChunks removed to let Vite handle splitting automatically
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', '@react-three/fiber', '@react-three/drei', 'zustand', '@dimforge/rapier3d-compat'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/vitest.setup.ts'],
    exclude: ['node_modules', 'dist', 'deploy_hf/**'],
  },
}
})
