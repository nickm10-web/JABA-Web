import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": "/Users/jaba/FRAMER/node_modules/react",
      "react-dom": "/Users/jaba/FRAMER/node_modules/react-dom",
    },
    dedupe: ["react", "react-dom", "motion"],
  },
});
