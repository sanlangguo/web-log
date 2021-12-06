import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    },{
      find: 'components',
      replacement: path.resolve(__dirname, 'src/components')
    }]
  },
  plugins: [vue()]
})
