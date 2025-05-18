import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      // Proxy CSRF endpoint and API calls to Laravel backend
      '/sanctum': {
        target: 'http://main.local',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://main.local',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});