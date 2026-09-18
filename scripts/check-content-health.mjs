// Three classes of problem that nothing else in the pipeline catches:
//
// 1. A content JSON referencing an image file that doesn't actually exist
//    under public/ — e.g. from a bad import, a deleted upload, or a typo
//    that slipped past Tina's media picker. This would otherwise only
//    surface as a broken image visitors notice on the live site.
//
// 2. A tour whose departure dates have all quietly passed. Since dates
//    (content/tours/*.json) are hand-entered with no expiry logic of
//    their own, a tour can go from "bookable" to "no upcoming departures"
//    with zero code changes — just time passing — so a push-triggered
//    check alone would miss it. This is why this script is run both in CI
//    (catches new bad content immediately) and on a weekly schedule
//    (catches dates lapsing with no new push at all).
//
// 3. A tour's destinationSlug (or a destination's relatedTourSlugs) that no
//    longer points at anything real — e.g. a destination gets renamed or
//    deleted in the admin panel and whatever referenced its old slug is
//    never updated. toursForDestination() would just silently return an
//    empty list rather than error, so nothing else would ever surface this.
import fs from "node:fs";

function loadJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

const destinations = loadJson("content/destinations/_index.json");
const tours = loadJson("content/tours/_index.json");

const problems = [];

function checkImage(imgPath, label) {
  if (!imgPath) return;
  const full = `public${imgPath}`;
  if (!fs.existsSync(full)) {
    problems.push(`Missing image file for ${label}: ${imgPath}`);
  }
}

for (const d of destinations) {
  checkImage(d.heroImg, `destination "${d.slug}" heroImg`);
  for (const g of d.gallery ?? []) checkImage(g, `destination "${d.slug}" gallery`);
}

for (const t of tours) {
  checkImage(t.heroImg, `tour "${t.slug}" heroImg`);
  for (const g of t.gallery ?? []) checkImage(g, `tour "${t.slug}" gallery`);
}

const today = new Date();
today.setHours(0, 0, 0, 0);

for (const t of tours) {
  const upcoming = (t.departureDates ?? []).filter((d) => new Date(d) >= today);
  if (upcoming.length === 0) {
    problems.push(
      `Tour "${t.slug}" has no upcoming departure dates left — the booking form will show ` +
        `"message us for the next available date" until new dates are added in the admin panel.`
    );
  }
}

const destinationSlugs = new Set(destinations.map((d) => d.slug));
const tourSlugs = new Set(tours.map((t) => t.slug));

for (const t of tours) {
  if (t.destinationSlug && !destinationSlugs.has(t.destinationSlug)) {
    problems.push(
      `Tour "${t.slug}" has destinationSlug "${t.destinationSlug}", which doesn't match any real destination.`
    );
  }
}

for (const d of destinations) {
  for (const rt of d.relatedTourSlugs ?? []) {
    if (!tourSlugs.has(rt)) {
      problems.push(`Destination "${d.slug}" lists relatedTourSlugs entry "${rt}", which doesn't match any real tour.`);
    }
  }
}

if (problems.length > 0) {
  console.error(`Content health check found ${problems.length} issue(s):\n`);
  for (const p of problems) console.error(`- ${p}`);
  process.exit(1);
}

console.log(`Content health check passed: ${destinations.length} destinations, ${tours.length} tours, no issues.`);
