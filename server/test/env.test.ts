import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

// env.ts exits the process on invalid config, so each case runs in a child process.
const run = (extra: Record<string, string>) =>
  spawnSync(process.execPath, ["--import", "tsx", "-e", 'await import("./src/config/env.ts")'], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, MONGODB_URI: "mongodb://127.0.0.1/x", ...extra },
    encoding: "utf8",
  });

describe("PUBLIC_SITE_URL validation", () => {
  it("accepts an https URL", () => {
    assert.equal(run({ PUBLIC_SITE_URL: "https://example.com/" }).status, 0);
  });
  it("rejects non-http(s) schemes", () => {
    for (const bad of ["javascript:alert(1)", "ftp://example.com"]) {
      const r = run({ PUBLIC_SITE_URL: bad });
      assert.equal(r.status, 1, bad);
      assert.match(r.stderr, /http\(s\) URL/);
    }
  });
});
