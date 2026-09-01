import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { madeRefine } from 'made-refine/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
      babel: {
        plugins: ['made-refine/babel'],
      },
    }), TanStackRouterVite(),
    madeRefine(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
