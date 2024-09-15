import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
console.log('VITE_BASE_PATH:', import.meta.env); // 调试信息
// https://vitejs.dev/config/
export default defineConfig({
  base:'/eticket/',
  plugins: [react()],
})
