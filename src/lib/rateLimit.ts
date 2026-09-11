// A deliberately simple in-memory limiter, not a distributed one (Upstash/
// Redis) — this process's memory is the only store, so a burst spread across
// multiple serverless instances isn't caught globally. It's still a real
// deterrent against the common case (one script hammering one instance),
// costs nothing, and needs no external account. Upgrade to a shared store if
// abuse ever shows up in practice.
const hits = new Map<string, number[]>();

// Forgetting old buckets is the only cleanup this needs — a plain interval
// timer would keep a serverless instance alive between invocations for no
// reason, so entries are pruned lazily on each check instead.
const MAX_TRACKED_KEYS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  const existing = (hits.get(key) ?? []).filter((t) => t > windowStart);
  existing.push(now);
  hits.set(key, existing);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  return existing.length <= limit;
}

export function clientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0].trim() || "unknown";
}
