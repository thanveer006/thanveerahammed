import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { getProject, listProjects } from "../controllers/project.controller.js";

export const projectRoutes = Router();

projectRoutes.get("/", asyncHandler(listProjects));
projectRoutes.get("/:slug", asyncHandler(getProject));
