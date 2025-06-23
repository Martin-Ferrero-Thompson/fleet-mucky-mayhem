import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../public',
    emptyOutDir: true
  },
  server: {
    port: 8080
  }
}