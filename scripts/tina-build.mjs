// The main site must always build, with or without an admin panel configured —
// same graceful-degradation pattern as the Resend and Groq integrations.
// TinaCloud credentials aren't set until the site owner finishes that signup,
// so skip the Tina static build until they exist instead of failing `next build`.
import { spawnSync } from "node:child_process";

if (!process.env.TINA_TOKEN || !process.env.NEXT_PUBLIC_TINA_CLIENT_ID) {
  console.log("Skipping TinaCMS build: NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN not set yet. The /admin panel will be unavailable until they are.");
  process.exit(0);
}

const result = spawnSync("npx", ["@tinacms/cli", "build"], { stdio: "inherit", shell: true });
process.exit(result.status ?? 1);
