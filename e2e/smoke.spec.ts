import { test, expect } from "@playwright/test";

test.describe("homepage", () => {
  test("loads with the expected nav and brand", async ({ page }) => {
    // domcontentloaded, not the default "load" — the Contact page's
    // OpenStreetMap iframe (and any third-party embed generally) can be
    // slow to fully finish loading, and none of these tests depend on it.
    // Real visitors aren't blocked by it either; the test shouldn't be.
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle(/Greenvital/);
    // Scoped to the nav landmark — "About Us" etc. legitimately also
    // appear in the footer, and an unscoped getByRole would (correctly)
    // fail strict mode on that ambiguity rather than a real bug.
    const nav = page.getByRole("navigation").first();
    await expect(nav.getByRole("link", { name: "About Us" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Our Services" })).toBeVisible();
  });
});

test.describe("wishlist", () => {
  test("saving a tour shows a confirmation toast", async ({ page }) => {
    await page.goto("/tours", { waitUntil: "domcontentloaded" });
    const saveButton = page.getByRole("button", { name: "Save to wishlist" }).first();
    await saveButton.click();

    const toast = page.locator("[data-sonner-toast]").first();
    // A slightly longer timeout than the 5s default — this waits on a real
    // client-side render+animation, not just a DOM query, and shouldn't be
    // flaky under momentary CI load for the sake of shaving a few seconds.
    await expect(toast).toBeVisible({ timeout: 10_000 });
    await expect(toast).toContainText("Saved");
    await expect(toast).toContainText("wishlist");
  });
});

test.describe("chatbot", () => {
  test("answers a real question and never mentions pricing in the greeting", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // The cookie banner overlaps the chat toggle's corner on first visit.
    await page.getByRole("button", { name: "Got it" }).click().catch(() => {});

    await page.getByRole("button", { name: "Open chat with the Greenvital assistant" }).click();

    const log = page.getByRole("log", { name: "Conversation" });
    await expect(log).toContainText("Hello");
    await expect(log).not.toContainText("pricing");

    await page.getByPlaceholder("Ask about destinations, visas, flights…").fill("Tell me about Kyoto");
    await page.keyboard.press("Enter");

    // The assistant's most recent reply bubble specifically — asserting on
    // the whole log would also match the user's own just-sent message, and
    // `.first()` here would just re-match the earlier greeting bubble.
    const latestBotBubble = log.locator("div.items-start > div").last();
    await expect(latestBotBubble).toContainText("Kyoto", { timeout: 15_000 });
  });
});

test.describe("contact form", () => {
  test("submits successfully with valid details", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });

    await page.getByPlaceholder("Full name").fill("Playwright Smoke Test");
    await page.getByPlaceholder("Email address").fill("smoke-test@example.com");
    await page
      .getByPlaceholder("Tell us a bit about what you're looking for")
      .fill("Automated smoke test submission — safe to ignore.");

    await page.getByRole("button", { name: "Send Message" }).click();

    // Longer timeout: this waits on a real network round-trip to /api/contact.
    await expect(page.getByText(/Thank you, Playwright Smoke Test/)).toBeVisible({ timeout: 10_000 });
  });

  test("blocks submission when required fields are empty", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Send Message" }).click();

    // The browser's own required-field validation should block the
    // request — the success state should never appear.
    await expect(page.getByText(/Thank you,/)).not.toBeVisible();
  });
});
