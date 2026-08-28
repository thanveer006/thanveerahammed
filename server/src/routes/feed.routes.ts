import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { robots, rss, sitemap } from "../controllers/feed.controller.js";

/** Mounted at the API root (not under /api) so URLs match the old site. */
export const feedRoutes = Router();

feedRoutes.get("/rss.xml", asyncHandler(rss));
feedRoutes.get("/sitemap.xml", asyncHandler(sitemap));
feedRoutes.get("/robots.txt", robots);
