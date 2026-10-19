/**
 * Trims text to a search-result-friendly meta description: prefers ending on
 * a full sentence within the limit, otherwise cuts at a word boundary and adds
 * an ellipsis. Google shows roughly 155-160 characters.
 */
export function metaDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const window = clean.slice(0, max);
  const lastSentence = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
  if (lastSentence >= max * 0.6) return window.slice(0, lastSentence + 1);

  const lastSpace = window.lastIndexOf(" ");
  return `${window.slice(0, lastSpace > 0 ? lastSpace : max - 1).replace(/[\s,;:—-]+$/, "")}…`;
}
