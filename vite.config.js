import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/fleet-mucky-mayhem/', 
  build: {
    outDir: '../public',
    emptyOutDir: true
  },
  server: {
    port: 8080
  }
})