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
 * Replaces the content collections with the bundled data. Does NOT touch
 * `messages` (contact submissions), so it's safe to re-run on every deploy.
 */
export async function seedDatabase(): Promise<SeedCounts> {
  await Promise.all([
    Project.deleteMany({}),
    Experience.deleteMany({}),
    SkillCategory.deleteMany({}),
    SiteMeta.deleteMany({}),
    Post.deleteMany({}),
  ]);

  await Project.insertMany(projects.map((p, i) => ({ ...p, order: i })));
  await Experience.insertMany(experience.map((e, i) => ({ ...e, order: i })));
  await SkillCategory.insertMany(skillCategories.map((c, i) => ({ ...c, order: i })));
  await SiteMeta.create({ key: "highlightedIntegrations", values: highlightedIntegrations });
  await Post.insertMany(posts);

  return {
    projects: projects.length,
    experience: experience.length,
    skillCategories: skillCategories.length,
    posts: posts.length,
  };
}

/** Seeds only when the content is empty — safe to call on every server boot. */
export async function seedIfEmpty(): Promise<void> {
  if ((await Project.estimatedDocumentCount()) > 0) return;
  console.log("Content collections empty — seeding from bundled data…");
  const c = await seedDatabase();
  console.log(
    `Seeded: ${c.projects} projects, ${c.experience} experience, ` +
      `${c.skillCategories} skill categories, ${c.posts} posts.`
  );
}
