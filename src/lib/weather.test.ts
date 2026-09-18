import { afterEach, describe, expect, it, vi } from "vitest";
import { getClimateSummary } from "./weather";

function mockGeocodeThenArchive(geocodeResult: unknown, archiveResult: unknown) {
  const fetchMock = vi
    .fn()
    .mockResolvedValueOnce({ ok: true, json: async () => geocodeResult })
    .mockResolvedValueOnce({ ok: true, json: async () => archiveResult });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("getClimateSummary", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("computes averages from the most recent complete occurrence of the requested month", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T00:00:00Z"));

    const fetchMock = mockGeocodeThenArchive(
      { results: [{ latitude: -8.4, longitude: 115.2, name: "Bali", country: "Indonesia" }] },
      { daily: { temperature_2m_max: [30, 32], temperature_2m_min: [24, 25], precipitation_sum: [0, 5] } }
    );

    // March has already fully completed by September in the same year.
    const result = await getClimateSummary("Bali", 3);

    expect(result).toEqual({
      place: "Bali",
      country: "Indonesia",
      month: "March",
      avgHighC: 31,
      avgLowC: 25,
      rainyDays: 1,
      totalDays: 2,
      dataYear: 2026,
    });

    const archiveUrl = fetchMock.mock.calls[1][0] as string;
    expect(archiveUrl).toContain("start_date=2026-03-01");
    expect(archiveUrl).toContain("end_date=2026-03-31");
  });

  it("uses last year's occurrence when the requested month hasn't finished yet this year", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T00:00:00Z"));

    const fetchMock = mockGeocodeThenArchive(
      { results: [{ latitude: 35.0, longitude: 135.7, name: "Kyoto", country: "Japan" }] },
      { daily: { temperature_2m_max: [10], temperature_2m_min: [2], precipitation_sum: [0] } }
    );

    // December hasn't happened yet as of September — must fall back to last year.
    await getClimateSummary("Kyoto", 12);

    const archiveUrl = fetchMock.mock.calls[1][0] as string;
    expect(archiveUrl).toContain("start_date=2025-12-01");
  });

  it("picks the most populous match when a name is ambiguous", async () => {
    // Real bug this guards against: searching "Bali" against the live API
    // ranked a small town in India ("Bāli", ~297k people) above the
    // Indonesian island (~4.2M people) by name-similarity alone. Population
    // is a far better signal of which place a traveler actually means.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-18T00:00:00Z"));

    const fetchMock = mockGeocodeThenArchive(
      {
        results: [
          { latitude: 22.9, longitude: 88.3, name: "Bāli", country: "India", population: 296973 },
          { latitude: -8.4, longitude: 115.2, name: "Bali", country: "Indonesia", population: 4225384 },
          { latitude: 35.0, longitude: 104.0, name: "Bali", country: "China", population: 7101 },
        ],
      },
      { daily: { temperature_2m_max: [30], temperature_2m_min: [24], precipitation_sum: [5] } }
    );

    const result = await getClimateSummary("Bali", 3);

    expect(result?.place).toBe("Bali");
    expect(result?.country).toBe("Indonesia");
    expect(fetchMock.mock.calls[0][0]).toContain("count=8");
  });

  it("returns null when geocoding finds nothing, without calling the archive API", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ results: [] }) });
    vi.stubGlobal("fetch", fetchMock);

    const result = await getClimateSummary("Nowhereland", 5);

    expect(result).toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("returns null instead of throwing when the network fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );

    const result = await getClimateSummary("Bali", 3);

    expect(result).toBeNull();
  });
});
