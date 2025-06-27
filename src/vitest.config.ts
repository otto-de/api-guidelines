import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["linting/**/*.spec.ts", "scripts/**/*.spec.ts"],
    reporters: ["verbose"],
    globals: true,
  },
});
