import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// `base` must match where GitHub Pages serves the site:
//   user site    (adamwjo.github.io)      -> '/'
//   project site (adamwjo.github.io/repo) -> '/repo/'
// The deploy workflow sets VITE_BASE from the repo name; local dev uses '/'.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
