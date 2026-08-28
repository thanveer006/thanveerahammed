/**
 * Seeds MongoDB from the canonical content sources:
 *   - server/seed/source/*.ts   (projects, experience, skills — the old lib/data)
 *   - server/seed/content/blog/*.mdx  (plain-markdown blog posts)
 *
 * Run with: npm run seed   (from repo root or the server workspace)
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { connectDB, disconnectDB } from "../src/config/db.js";
import { Project } from "../src/models/project.model.js";
import { Experience } from "../src/models/experience.model.js";
import { SkillCategory, SiteMeta } from "../src/models/skill-category.model.js";
import { Post } from "../src/models/post.model.js";

import { projects } from "./source/projects.js";
import { experience } from "./source/experience.js";
import { skillCategories, highlightedIntegrations } from "./source/skills.js";

const here = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(here, "content", "blog");

function loadPosts() {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = readFileSync(join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: String(data.title),
        description: String(data.description),
        date: String(data.date),
        tags: (data.tags as string[] | undefined) ?? [],
        content: content.trim(),
      };
    });
}

async function run() {
  await connectDB();

  const posts = loadPosts();

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

  console.log(
    `Seeded: ${projects.length} projects, ${experience.length} experience, ` +
      `${skillCategories.length} skill categories, ${posts.length} posts.`
  );

  await disconnectDB();
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
