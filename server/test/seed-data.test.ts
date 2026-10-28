import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { projects } from "../src/seed/data/projects.js";
import { experience } from "../src/seed/data/experience.js";
import { skillCategories } from "../src/seed/data/skills.js";
import { posts } from "../src/seed/data/posts.js";

// The seed upserts by these natural keys; duplicates would silently collapse rows.
const unique = (xs: string[]) => new Set(xs).size === xs.length;

describe("seed data natural keys are unique", () => {
  it("project slugs", () => assert.ok(unique(projects.map((p) => p.slug))));
  it("post slugs", () => assert.ok(unique(posts.map((p) => p.slug))));
  it("skill category names", () => assert.ok(unique(skillCategories.map((c) => c.name))));
  it("experience company/role/start", () =>
    assert.ok(unique(experience.map((e) => `${e.company}|${e.role}|${e.start}`))));
});
