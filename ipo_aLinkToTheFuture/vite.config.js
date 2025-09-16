// vite.config.js
import { resolve } from 'path'

export default {
  base: './',
  
  // Configuração do servidor
  server: {
    port: 3000, // Forçar porta 3000
    open: '/game.html' // Abrir game.html automaticamente
  },
  
  // Configuração do build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'game.html')
      }
    }
  }
}