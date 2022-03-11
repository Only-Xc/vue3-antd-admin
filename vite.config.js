import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // @/xxxx => src/xxxx
      '@': pathResolve('./src')
    }
  },
  server: {
    host: true,
    port: 8080
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 打包时移除 console
        drop_debugger: true // 打包时移除 debugger
      }
    }
  }
})
