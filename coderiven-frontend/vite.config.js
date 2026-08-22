import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      input: "./index.html", // Absolute path for clarity
      output: {
        dir: "../coderiven-backend/static/frontend", // Ensure alignment with Django's STATICFILES_DIRS
        assetFileNames: "assets/[name]-[hash].[ext]", // Organized static assets
        entryFileNames: "assets/[name]-[hash].js", // Entry JavaScript files
      },
    },
    outDir: "../coderiven-backend/static/frontend",
    emptyOutDir: true, // Clean the output folder before each build
    // chunkSizeWarningLimit: 3000, // Increase the limit to avoid warnings for chunks over 3000 KB (optional)
  },
  base: "/static/frontend/", // Match Django's static file handling
});
