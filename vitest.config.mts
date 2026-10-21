import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, ".") } },
  test: {
    include: ["tests/**/*.test.ts", "lib/__tests__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["lib/auth/**/*.ts", "lib/entitlements/**/*.ts", "lib/projections/**/*.ts"],
      // Provider-gated auth scaffold has skipped A17 contract tests and is excluded until integration exists.
      exclude: ["lib/auth/client.ts"],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
