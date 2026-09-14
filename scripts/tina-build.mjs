// The main site must always build, with or without an admin panel configured —
// same graceful-degradation pattern as the Resend and Groq integrations.
// TinaCloud credentials aren't set until the site owner finishes that signup,
// so skip the Tina static build until they exist instead of failing `next build`.
//
// Also writes public/tina-build-status.txt so build status can be checked by
// visiting that URL after a deploy, instead of digging through Vercel's build
// log UI every time.
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync, mkdirSync } from "node:fs";

const lines = [];
const log = (msg) => {
  lines.push(msg);
  console.log(msg);
};

mkdirSync("public", { recursive: true });

log(`tina-build.mjs started: ${new Date().toISOString()}`);
log(`Has TINA_TOKEN: ${Boolean(process.env.TINA_TOKEN)}`);
log(`Has NEXT_PUBLIC_TINA_CLIENT_ID: ${Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID)}`);
log(`Node version: ${process.version}`);

if (!process.env.TINA_TOKEN || !process.env.NEXT_PUBLIC_TINA_CLIENT_ID) {
  log("Result: SKIPPED — NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN not set yet. The /admin panel will be unavailable until they are.");
  writeFileSync("public/tina-build-status.txt", lines.join("\n") + "\n");
  process.exit(0);
}

const result = spawnSync("npx", ["@tinacms/cli", "build"], { stdio: "inherit", shell: true });
log(`tinacms build exit code: ${result.status}`);
if (result.error) log(`spawn error: ${result.error.message}`);
log(`public/admin/index.html exists after build: ${existsSync("public/admin/index.html")}`);
log(`Result: ${result.status === 0 ? "SUCCESS" : "FAILED"}`);

writeFileSync("public/tina-build-status.txt", lines.join("\n") + "\n");

// Never let a broken admin-panel build take the whole site down with it —
// same reasoning as the rest of the graceful-degradation pattern here.
process.exit(0);
