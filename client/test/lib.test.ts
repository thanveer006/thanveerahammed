// Simulate a visitor west of UTC (the site's audience is worldwide; IST users never
// hit this bug, US visitors did). Set in-process because Node on Windows ignores a
// TZ variable passed from the shell; must run before any Date is formatted.
process.env.TZ = "America/Los_Angeles";

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "../src/lib/format.ts";
import { collectTags, filterProjects } from "../src/lib/filter-projects.ts";

describe("formatDate", () => {
  it("keeps the calendar date regardless of the runtime time zone", () => {
    // Without timeZone: "UTC" this rendered "May 11, 2026" anywhere west of UTC.
    assert.equal(formatDate("2026-05-12"), "May 12, 2026");
    assert.equal(formatDate("2026-01-01", "long"), "January 1, 2026");
  });

  it("returns unparseable input unchanged instead of 'Invalid Date'", () => {
    assert.equal(formatDate("someday"), "someday");
  });
});

const projects = [
  { name: "Faculty HR", category: "Enterprise", oneLiner: "Payroll and RBAC", tech: ["Next.js", "MongoDB"] },
  { name: "Mentor Ops", category: "Automation", oneLiner: "WhatsApp flows", tech: ["Node.js", "MongoDB"] },
  { name: "Events", category: "Platform", oneLiner: "Ticketing", tech: ["react", "Prisma"] },
];

describe("filterProjects", () => {
  it("returns everything for an empty or whitespace query", () => {
    assert.equal(filterProjects(projects, "", null).length, 3);
    assert.equal(filterProjects(projects, "   ", null).length, 3);
  });

  it("ignores surrounding whitespace and case (trailing-space regression)", () => {
    assert.deepEqual(
      filterProjects(projects, "  PAYROLL ", null).map((p) => p.name),
      ["Faculty HR"]
    );
  });

  it("requires every term to match, across fields", () => {
    assert.deepEqual(filterProjects(projects, "mongodb whatsapp", null).map((p) => p.name), ["Mentor Ops"]);
    assert.equal(filterProjects(projects, "mongodb ticketing", null).length, 0);
  });

  it("combines the query with an exact tag", () => {
    assert.deepEqual(filterProjects(projects, "", "MongoDB").map((p) => p.name), ["Faculty HR", "Mentor Ops"]);
    assert.deepEqual(filterProjects(projects, "payroll", "Node.js"), []);
  });
});

describe("collectTags", () => {
  it("dedupes and sorts case-insensitively", () => {
    assert.deepEqual(collectTags(projects), ["MongoDB", "Next.js", "Node.js", "Prisma", "react"]);
  });
});
