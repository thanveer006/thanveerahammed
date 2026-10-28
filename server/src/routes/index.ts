import { Router } from "express";
import { projectRoutes } from "./project.routes.js";
import { postRoutes } from "./post.routes.js";
import { experienceRoutes } from "./experience.routes.js";
import { skillRoutes } from "./skill.routes.js";
import { contactRoutes } from "./contact.routes.js";
import { cacheControl } from "../middleware/cache.js";
import { apiRateLimit } from "../middleware/rate-limit.js";

/** Everything under `/api`. */
export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));
apiRouter.use(apiRateLimit);

const content = cacheControl(60);
apiRouter.use("/projects", content, projectRoutes);
apiRouter.use("/posts", content, postRoutes);
apiRouter.use("/experience", content, experienceRoutes);
apiRouter.use("/skills", content, skillRoutes);
apiRouter.use("/contact", contactRoutes);
