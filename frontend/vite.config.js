import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    origin: "http://localhost:5173",
    cors: {
      origin: "https://brainboxai.onrender.com", // backend URL
      credentials: true
    }
  }
})
