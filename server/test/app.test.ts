import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import type { Server } from "node:http";

// No database or email is touched: only routes that answer before any Mongo call.
process.env.MONGODB_URI ??= "mongodb://127.0.0.1:27017/unused-in-tests";
delete process.env.RESEND_API_KEY;

const { createApp } = await import("../src/app.js");
const { contactSchema } = await import("../src/controllers/contact.controller.js");
const { serializePost, serializePostMeta, serializeExperience } = await import(
  "../src/views/serializers.js"
);

let server: Server;
let base: string;

before(async () => {
  server = createApp().listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
after(() => {
  server.close();
});

const post = (path: string, body: string) =>
  fetch(base + path, { method: "POST", headers: { "content-type": "application/json" }, body });

describe("http", () => {
  it("GET /api/health", async () => {
    const res = await fetch(`${base}/api/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
    assert.equal(res.headers.get("x-powered-by"), null);
  });

  it("GET /robots.txt points at the sitemap", async () => {
    const res = await fetch(`${base}/robots.txt`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /Sitemap: https?:\/\/\S+\/sitemap\.xml/);
  });

  it("unknown routes return the JSON 404 shape without cache headers", async () => {
    const res = await fetch(`${base}/api/nope`);
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { error: "Not found" });
    assert.equal(res.headers.get("cache-control"), null);
  });

  it("malformed JSON is a 400, not a 500", async () => {
    const res = await post("/api/contact", "{not json");
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), { error: "Invalid request body" });
  });

  it("oversized body is a 413", async () => {
    const res = await post("/api/contact", JSON.stringify({ message: "x".repeat(70_000) }));
    assert.equal(res.status, 413);
  });

  it("contact validation errors use the {status,message} shape", async () => {
    const res = await post("/api/contact", JSON.stringify({ name: "A", email: "bad", message: "hi" }));
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), {
      status: "error",
      message: "Please enter a valid email address.",
    });
  });

  it("honeypot submissions succeed silently without touching the DB", async () => {
    const res = await post(
      "/api/contact",
      JSON.stringify({ name: "Bot", email: "bot@example.com", message: "spam", company: "Acme" })
    );
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "success" });
  });
});

describe("contactSchema", () => {
  it("trims and rejects blanks / oversize / header-style emails", () => {
    const ok = contactSchema.parse({ name: " A ", email: " a@b.co ", message: " hi " });
    assert.deepEqual([ok.name, ok.email, ok.message], ["A", "a@b.co", "hi"]);
    assert.equal(contactSchema.safeParse({ name: "", email: "a@b.co", message: "x" }).success, false);
    assert.equal(contactSchema.safeParse({ name: "A", email: "a@b.co", message: "x".repeat(5001) }).success, false);
    assert.equal(contactSchema.safeParse({ name: "A", email: "a@b.co,c@d.co", message: "x" }).success, false);
  });
});

describe("serializers", () => {
  const doc = { _id: 1, __v: 0, slug: "s", title: "T", description: "D", date: "2025-01-01", readingTime: "1 min read", content: "# hi", createdAt: new Date() };
  it("strips Mongo internals and defaults arrays", () => {
    const meta = serializePostMeta(doc);
    assert.deepEqual(Object.keys(meta).sort(), ["date", "description", "readingTime", "slug", "tags", "title"]);
    assert.deepEqual(meta.tags, []);
    assert.equal(serializePost(doc).content, "# hi");
  });
  it("omits null companyUrl", () => {
    const e = serializeExperience({ role: "r", company: "c", companyUrl: null, start: "a", end: "b", type: "t", impact: "i" });
    assert.equal(e.companyUrl, undefined);
    assert.deepEqual(e.tech, []);
  });
});
