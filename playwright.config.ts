import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  // This is a handful of fast smoke tests, not a large suite — running
  // them serially costs a few seconds and avoids the flakiness of several
  // Chromium instances contending for CPU on a modest CI runner, which
  // showed up as real, reproducible timeouts under full parallelism.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Reuses a server already running locally (fast inner-loop testing) but
  // always starts a fresh one in CI, against the production build — the
  // same "how it actually behaves for a visitor" standard as the rest of
  // this test suite.
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
