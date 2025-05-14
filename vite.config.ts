import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    include: [
      '@solana/web3.js',
      '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-react-ui',
      '@solana/wallet-adapter-wallets'
    ],
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      include: [/@solana\/.*/, /node_modules/],
    },
  },
  resolve: {
    alias: {
      process: path.resolve(__dirname, 'node_modules/process/browser.js'),
      stream: path.resolve(__dirname, 'node_modules/stream-browserify'),
      zlib: path.resolve(__dirname, 'node_modules/browserify-zlib'),
      util: path.resolve(__dirname, 'node_modules/util'),
      buffer: path.resolve(__dirname, 'node_modules/buffer'),
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://api.devnet.solana.com wss://api.devnet.solana.com;
        frame-src 'self' https://*.solana.com;
        worker-src 'self' blob:;
      `.replace(/\s+/g, ' ').trim()
    }
  }
})
