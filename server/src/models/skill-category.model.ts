import { Schema, model, InferSchemaType } from "mongoose";

const skillCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type SkillCategoryDoc = InferSchemaType<typeof skillCategorySchema>;
export const SkillCategory = model("SkillCategory", skillCategorySchema);

const siteMetaSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    values: { type: [String], default: [] },
  },
  { timestamps: true }
);

export type SiteMetaDoc = InferSchemaType<typeof siteMetaSchema>;
/** Small key/value list store — currently holds `highlightedIntegrations`. */
export const SiteMeta = model("SiteMeta", siteMetaSchema);
