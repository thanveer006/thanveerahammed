import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { getSkills } from "../controllers/skill.controller.js";

export const skillRoutes = Router();

skillRoutes.get("/", asyncHandler(getSkills));
