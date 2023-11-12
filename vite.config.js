import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/wohmod/',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
})
