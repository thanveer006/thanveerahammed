import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { cacheControl } from "../middleware/cache.js";
import { robots, rss, sitemap } from "../controllers/feed.controller.js";

/** Mounted at the API root (not under /api) so URLs match the old site. */
export const feedRoutes = Router();
const cache = cacheControl(300);

feedRoutes.get("/rss.xml", cache, asyncHandler(rss));
feedRoutes.get("/sitemap.xml", cache, asyncHandler(sitemap));
feedRoutes.get("/robots.txt", cache, robots);
