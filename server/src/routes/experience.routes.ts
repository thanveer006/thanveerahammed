import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { listExperience } from "../controllers/experience.controller.js";

export const experienceRoutes = Router();

experienceRoutes.get("/", asyncHandler(listExperience));
