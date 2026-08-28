import type { Request, Response } from "express";
import { Project } from "../models/project.model.js";
import { serializeProject } from "../views/serializers.js";

export async function listProjects(_req: Request, res: Response) {
  const projects = await Project.find().sort({ order: 1, year: -1 }).lean();
  res.json(projects.map(serializeProject));
}

export async function getProject(req: Request, res: Response) {
  const project = await Project.findOne({ slug: req.params.slug }).lean();
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(serializeProject(project));
}
