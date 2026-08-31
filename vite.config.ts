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
  server: {
    host: "0.0.0.0",
    port: 5179,
    strictPort: true,
    allowedHosts: ["192.168.1.70", "localhost"],
    // no hmr.host override
    // no hmr.clientPort override
  },
});
