import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

function staticSites() {
  return {
    name: "static-sites",
    apply: "build",
    async closeBundle() {
      const dist = resolve("dist");
      await mkdir(resolve(dist, "server"), { recursive: true });
      await cp(resolve("worker/index.js"), resolve(dist, "server/index.js"));
      await mkdir(resolve(dist, ".openai"), { recursive: true });
      await cp(
        resolve(".openai/hosting.json"),
        resolve(dist, ".openai/hosting.json"),
      );
    },
  };
}

export default defineConfig({
  base: "./",
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), staticSites()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.js",
  },
});
