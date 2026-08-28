/**
 * Writes empty stubs for src/generated/* if they don't exist yet, so `dev` and
 * type-checking work on a fresh clone before the first `snapshot`/`build`.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "generated");
mkdirSync(outDir, { recursive: true });

const contentPath = join(outDir, "content.ts");
if (!existsSync(contentPath)) {
  writeFileSync(
    contentPath,
    "// AUTO-GENERATED stub — replaced by scripts/snapshot-content.mjs on build.\n" +
      'import type { Snapshot } from "@/lib/types";\n\n' +
      "export const snapshot: Snapshot = {\n" +
      "  projects: [],\n  posts: [],\n  fullPosts: [],\n  experience: [],\n" +
      "  skills: { categories: [], highlightedIntegrations: [] },\n};\n"
  );
}

const routesPath = join(outDir, "routes.json");
if (!existsSync(routesPath)) writeFileSync(routesPath, "[]\n");
