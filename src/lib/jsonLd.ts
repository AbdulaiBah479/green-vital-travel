/**
 * Serializes structured data for a `<script type="application/ld+json">` tag.
 *
 * JSON.stringify alone doesn't escape "<", so a value containing the literal
 * text "</script>" could prematurely close the tag and inject markup after
 * it. Escaping "<" to its unicode form is a no-op for JSON parsing but makes
 * that impossible — standard hardening for JSON-LD embedded via
 * dangerouslySetInnerHTML, regardless of how unlikely that content is today.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
