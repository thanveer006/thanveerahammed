import type { Request, Response } from "express";
import { Experience } from "../models/experience.model.js";
import { serializeExperience } from "../views/serializers.js";

export async function listExperience(_req: Request, res: Response) {
  const entries = await Experience.find().sort({ order: 1 }).lean();
  res.json(entries.map(serializeExperience));
}
