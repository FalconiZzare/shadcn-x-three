import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/shadcn-x-three",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  preview: {
    port: 8080,
    strictPort: true
  },
  server: {
    host: true
    // port: 8080,
    // strictPort: true
  }
});
