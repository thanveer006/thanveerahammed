import type { Request, Response } from "express";
import { SkillCategory, SiteMeta } from "../models/skill-category.model.js";
import { serializeSkillCategory } from "../views/serializers.js";

export async function getSkills(_req: Request, res: Response) {
  const [categories, integrations] = await Promise.all([
    SkillCategory.find().sort({ order: 1 }).lean(),
    SiteMeta.findOne({ key: "highlightedIntegrations" }).lean(),
  ]);

  res.json({
    categories: categories.map(serializeSkillCategory),
    highlightedIntegrations: integrations?.values ?? [],
  });
}
