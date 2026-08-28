import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";

const apiBase = process.env.VITE_API_URL ?? "http://localhost:4000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Dev convenience: /api, /rss.xml, /sitemap.xml, /robots.txt hit the API.
      "/api": { target: apiBase, changeOrigin: true },
      "/rss.xml": { target: apiBase, changeOrigin: true },
      "/sitemap.xml": { target: apiBase, changeOrigin: true },
      "/robots.txt": { target: apiBase, changeOrigin: true },
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "none",
    // Static routes come from the route table; dynamic project/blog pages are
    // expanded from src/generated/routes.json, written by
    // scripts/snapshot-content.mjs immediately before the build.
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => !p.includes(":") && !p.includes("*"));
      try {
        const dynamic: string[] = JSON.parse(
          readFileSync(new URL("./src/generated/routes.json", import.meta.url), "utf8")
        );
        return [...staticPaths, ...dynamic];
      } catch {
        return staticPaths;
      }
    },
  },
});
