import { Router } from "express";
import { projectRoutes } from "./project.routes.js";
import { postRoutes } from "./post.routes.js";
import { experienceRoutes } from "./experience.routes.js";
import { skillRoutes } from "./skill.routes.js";
import { contactRoutes } from "./contact.routes.js";

/** Everything under `/api`. */
export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));
apiRouter.use("/projects", projectRoutes);
apiRouter.use("/posts", postRoutes);
apiRouter.use("/experience", experienceRoutes);
apiRouter.use("/skills", skillRoutes);
apiRouter.use("/contact", contactRoutes);
