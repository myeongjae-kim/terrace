import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "#": srcPath,
      "@": srcPath,
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
