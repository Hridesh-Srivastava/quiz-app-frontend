import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Generate sourcemaps for better debugging
    sourcemap: true,
    // Ensure assets are properly referenced
    assetsDir: "assets",
    // Make sure output is optimized for production
    minify: "terser",
    // Ensure proper paths
    outDir: "dist",
  },
})


