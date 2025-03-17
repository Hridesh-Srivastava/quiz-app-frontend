// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"
// import path from "path"
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "./src/styles/globals.css";`,
//       },
//     },
//   },
//   build: {
//     outDir: "dist",
//     assetsDir: "assets",
//     emptyOutDir: true,
//     sourcemap: false,
//     minify: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
//         },
//       },
//     },
//   },
// })


import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/globals.css";`, // Ensure the correct path to your global SCSS file
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
        },
      },
    },
  },
})

