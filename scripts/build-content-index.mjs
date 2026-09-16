// Aggregates the individual, Tina-editable JSON files under content/tours and
// content/destinations into single index files that src/lib/tours.ts and
// src/lib/destinations.ts import normally (a plain JSON import, safe to bundle
// into client components too — unlike reading the filesystem directly, which
// would break any "use client" component that imports that data).
//
// Runs before both `next dev` and `next build`, so newly added or edited
// content shows up the next time either starts.
import fs from "node:fs";
import path from "node:path";

function buildIndex(dirName) {
  const dir = path.join(process.cwd(), "content", dirName);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && f !== "_index.json");
  const items = files
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(path.join(dir, "_index.json"), JSON.stringify(items, null, 2) + "\n");
  console.log(`content/${dirName}/_index.json: ${items.length} entries`);
}

buildIndex("tours");
buildIndex("destinations");
