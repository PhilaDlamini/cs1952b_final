import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content/content.js"),
        background: resolve(__dirname, "src/background/background.js")
      },
      output: {
        entryFileNames: "[name].js"
      }
    },
    outDir: "dist",
    emptyOutDir: true
  },
  plugins: [
    {
      name: "copy-manifest",
      closeBundle() {
        fs.copyFileSync("manifest.json", "dist/manifest.json");
      }
    }
  ]
});