import "dotenv/config";
import { z } from "zod";

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

/** Origins allowed to call the API from a browser. */
export const allowedOrigins = env.CLIENT_URL.split(",")
  .map((o) => o.trim())
  .filter(Boolean);
