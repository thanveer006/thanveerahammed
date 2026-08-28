/**
 * Manual seed: `npm run seed --workspace server`.
 * Force-replaces the content collections regardless of current state.
 * The server also seeds itself on boot when the collections are empty
 * (see seedIfEmpty in ./index.ts), so this is only needed to re-sync
 * content after editing the bundled data / blog posts.
 */
import { connectDB, disconnectDB } from "../config/db.js";
import { seedDatabase } from "./index.js";

async function main() {
  await connectDB();
  const c = await seedDatabase();
  console.log(
    `Seeded: ${c.projects} projects, ${c.experience} experience, ` +
      `${c.skillCategories} skill categories, ${c.posts} posts.`
  );
  await disconnectDB();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
