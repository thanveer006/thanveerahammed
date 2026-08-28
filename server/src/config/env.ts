import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

// Load server/.env regardless of the process's cwd (dist/ is two levels deep).
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env") });

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  CLIENT_URL: z.string().default("http://localhost:5173"),
  PUBLIC_SITE_URL: z.string().url().default("https://thanveerahammed.in"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  RESEND_API_KEY: z.string().optional(),
  CONTACT_TO_EMAIL: z.string().optional(),
  CONTACT_FROM_EMAIL: z
    .string()
    .default("Portfolio Contact Form <onboarding@resend.dev>"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

/**
 * Origins allowed to call the API from a browser: everything in CLIENT_URL, plus
 * the public site origin (the deployed frontend is almost always served there),
 * so a forgotten CLIENT_URL update doesn't silently break every production fetch.
 */
export const allowedOrigins = Array.from(
  new Set([
    ...env.CLIENT_URL.split(",").map((o) => o.trim()).filter(Boolean),
    new URL(env.PUBLIC_SITE_URL).origin,
  ])
);

if (
  env.NODE_ENV === "production" &&
  env.CLIENT_URL.split(",").every((o) => /localhost|127\.0\.0\.1/.test(o))
) {
  console.warn(
    "[env] CLIENT_URL still points only at localhost in production — set it to your deployed frontend origin(s)."
  );
}
