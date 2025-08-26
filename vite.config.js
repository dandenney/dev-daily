import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  server: {
    port: 7001,
    proxy: {
      '/api': 'http://localhost:7002'
    }
  },
  build: {
    outDir: '../dist'
  }
})