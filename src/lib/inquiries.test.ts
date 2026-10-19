import { describe, expect, it } from "vitest";
import { escapeHtml } from "./inquiries";

describe("escapeHtml", () => {
  it("neutralizes markup so form input can't inject HTML into the notification email", () => {
    expect(escapeHtml(`<a href="https://evil.example">click</a> & 'x'`)).toBe(
      "&lt;a href=&quot;https://evil.example&quot;&gt;click&lt;/a&gt; &amp; &#39;x&#39;"
    );
  });

  it("leaves plain text unchanged", () => {
    expect(escapeHtml("Hello, I'd like a quote")).toBe("Hello, I&#39;d like a quote");
  });
});
