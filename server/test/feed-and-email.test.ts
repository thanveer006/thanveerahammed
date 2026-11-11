import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Pure functions only — importing the modules needs a syntactically valid env.
process.env.MONGODB_URI ??= "mongodb://127.0.0.1:27017/unused-in-tests";

const { renderRss, renderSitemap, escapeXml, STATIC_ROUTES } = await import(
  "../src/services/feed.service.js"
);
const { singleLine } = await import("../src/services/email.service.js");
const { contactSchema } = await import("../src/controllers/contact.controller.js");

const SITE = "https://example.test";

describe("escapeXml", () => {
  it("escapes all five XML special characters", () => {
    assert.equal(escapeXml(`<a href="x">Tom & Jerry's</a>`), "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&apos;s&lt;/a&gt;");
  });
});

describe("renderRss", () => {
  const now = new Date("2026-01-02T03:04:05Z");
  const xml = renderRss(
    [
      { slug: "a-b", title: "Fish & <Chips>", description: `He said "hi"`, date: "2026-05-12" },
      { slug: "bad-date", title: "No date", description: "d", date: "not a date" },
    ],
    SITE,
    now
  );

  it("escapes user content in titles and descriptions", () => {
    assert.match(xml, /<title>Fish &amp; &lt;Chips&gt;<\/title>/);
    assert.match(xml, /<description>He said &quot;hi&quot;<\/description>/);
    assert.doesNotMatch(xml, /<Chips>/);
  });

  it("emits absolute links, a self link and lastBuildDate", () => {
    assert.match(xml, /<link>https:\/\/example\.test\/blog\/a-b<\/link>/);
    assert.match(xml, /<atom:link href="https:\/\/example\.test\/rss\.xml" rel="self"/);
    assert.match(xml, /<lastBuildDate>Fri, 02 Jan 2026 03:04:05 GMT<\/lastBuildDate>/);
  });

  it("uses the calendar date as UTC and omits pubDate for an unparseable date", () => {
    assert.match(xml, /<pubDate>Tue, 12 May 2026 00:00:00 GMT<\/pubDate>/);
    assert.doesNotMatch(xml, /Invalid Date/);
    assert.equal(xml.match(/<pubDate>/g)?.length, 1);
  });
});

describe("renderSitemap", () => {
  const xml = renderSitemap(
    [{ slug: "p1", updatedAt: new Date("2026-03-01T00:00:00Z") }],
    [{ slug: "b1", date: "2026-02-01" }],
    SITE
  );

  it("lists static routes plus every project and post", () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    assert.equal(locs.length, STATIC_ROUTES.length + 2);
    assert.ok(locs.includes(`${SITE}/projects/p1`));
    assert.ok(locs.includes(`${SITE}/blog/b1`));
  });

  it("falls back to the post date for lastmod", () => {
    assert.match(xml, /<loc>https:\/\/example\.test\/blog\/b1<\/loc>\n {4}<lastmod>2026-02-01T00:00:00\.000Z<\/lastmod>/);
  });
});

describe("singleLine (email header safety)", () => {
  it("collapses CR/LF and control characters", () => {
    assert.equal(singleLine("Eve\r\nBcc: victim@x.com"), "Eve Bcc: victim@x.com");
    assert.equal(singleLine("a\u0000 b\t"), "a b");
  });
});

describe("contactSchema edge cases", () => {
  const base = { name: "A", email: "a@b.co", message: "hi" };

  it("gives the friendly message for missing or non-string fields", () => {
    for (const bad of [{ ...base, name: undefined }, { ...base, message: 42 }, { ...base, email: null }]) {
      const r = contactSchema.safeParse(bad);
      assert.equal(r.success, false);
      assert.equal(r.error?.issues[0]?.message, "Please fill in every field.");
    }
  });

  it("reports a blank email as missing, not invalid", () => {
    const r = contactSchema.safeParse({ ...base, email: "   " });
    assert.equal(r.error?.issues[0]?.message, "Please fill in every field.");
  });

  it("bounds the honeypot", () => {
    assert.equal(contactSchema.safeParse({ ...base, company: "x".repeat(501) }).success, false);
  });
});
