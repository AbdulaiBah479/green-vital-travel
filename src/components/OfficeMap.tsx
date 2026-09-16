// Congo Cross neighborhood center — not a geocoded pin on the exact
// building at 57 Main Motor Road, since that needs a real address lookup
// rather than a guess. Close enough to orient someone; replace with a
// precise geocode if you get one.
const lat = 8.483077;
const lon = -13.258893;
const delta = 0.006;
const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].join(",");

export default function OfficeMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10">
      <iframe
        title="Green Vital office — Congo Cross, Freetown, Sierra Leone"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
        className="h-64 w-full sm:h-72"
        loading="lazy"
      />
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="block bg-paper-dim px-4 py-2.5 text-center text-xs eyebrow uppercase text-ink/70 transition-colors hover:text-accent-deep"
      >
        View Larger Map →
      </a>
    </div>
  );
}
