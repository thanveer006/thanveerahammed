import type { Model } from "mongoose";
import { Project } from "../models/project.model.js";
import { Experience } from "../models/experience.model.js";
import { SkillCategory, SiteMeta } from "../models/skill-category.model.js";
import { Post } from "../models/post.model.js";
import { projects } from "./data/projects.js";
import { experience } from "./data/experience.js";
import { skillCategories, highlightedIntegrations } from "./data/skills.js";
import { posts } from "./data/posts.js";

export type SeedCounts = {
  projects: number;
  experience: number;
  skillCategories: number;
  posts: number;
};

/**
 * Upserts each doc by its natural key, then removes rows no longer in the bundled
 * data. Unlike delete-then-insert, readers never see an empty collection and a
 * mid-run failure can't wipe the content; concurrent runs converge on the same state.
 */
async function sync(
  model: Model<any>,
  keyOf: (doc: any) => Record<string, unknown>,
  docs: any[]
): Promise<void> {
  if (docs.length === 0) {
    await model.deleteMany({});
    return;
  }
  await model.bulkWrite(
    docs.map((doc) => ({
      updateOne: { filter: keyOf(doc), update: { $set: doc }, upsert: true },
    }))
  );
  await model.deleteMany({ $nor: docs.map(keyOf) });
}

/**
 * Syncs the content collections with the bundled data. Does NOT touch `messages`
 * (contact submissions), so it's safe to re-run on every deploy.
 */
export async function seedDatabase(): Promise<SeedCounts> {
  await sync(Project, (d) => ({ slug: d.slug }), projects.map((p, i) => ({ ...p, order: i })));
  await sync(
    Experience,
    (d) => ({ company: d.company, role: d.role, start: d.start }),
    experience.map((e, i) => ({ ...e, order: i }))
  );
  await sync(SkillCategory, (d) => ({ name: d.name }), skillCategories.map((c, i) => ({ ...c, order: i })));
  await sync(SiteMeta, (d) => ({ key: d.key }), [
    { key: "highlightedIntegrations", values: highlightedIntegrations },
  ]);
  await sync(Post, (d) => ({ slug: d.slug }), posts);

  return {
    projects: projects.length,
    experience: experience.length,
    skillCategories: skillCategories.length,
    posts: posts.length,
  };
}

/** Seeds only when any content collection is empty — safe to call on every server boot. */
export async function seedIfEmpty(): Promise<void> {
  const counts = await Promise.all([
    Project.estimatedDocumentCount(),
    Experience.estimatedDocumentCount(),
    SkillCategory.estimatedDocumentCount(),
    Post.estimatedDocumentCount(),
  ]);
  if (counts.every((n) => n > 0)) return;
  console.log("Content collections empty or incomplete — seeding from bundled data…");
  const c = await seedDatabase();
  console.log(
    `Seeded: ${c.projects} projects, ${c.experience} experience, ` +
      `${c.skillCategories} skill categories, ${c.posts} posts.`
  );
}
