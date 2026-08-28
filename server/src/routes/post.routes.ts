import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { getPost, listPosts } from "../controllers/post.controller.js";

export const postRoutes = Router();

postRoutes.get("/", asyncHandler(listPosts));
postRoutes.get("/:slug", asyncHandler(getPost));
