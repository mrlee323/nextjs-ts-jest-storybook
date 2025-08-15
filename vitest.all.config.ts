import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      // 1) 일반 컴포넌트/유닛 테스트 (jsdom)
      {
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          css: true,
          clearMocks: true,
        },
        resolve: {
          alias: { "@": path.resolve(dirname, "src") },
        },
        esbuild: { jsx: "automatic" },
      },
      // 2) 스토리북 테스트 (Playwright 브라우저)
      {
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
        esbuild: { jsx: "automatic" },
      },
    ],
  },
});
