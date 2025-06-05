import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy /appwrite-api requests to your Appwrite endpoint
      "/appwrite-api": {
        target: `https://fra.cloud.appwrite.io/v1`, // Replace with your Appwrite API endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/appwrite-api/, ""),
      },
    },
  },
});
