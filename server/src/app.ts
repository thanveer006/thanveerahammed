import express from "express";
import cors from "cors";
import helmet from "helmet";
import { allowedOrigins } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { feedRoutes } from "./routes/feed.routes.js";
import { errorHandler, notFound } from "./middleware/error-handler.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  // This API is meant to be read from a different origin (the static client), so
  // don't let helmet's default `Cross-Origin-Resource-Policy: same-origin` get in
  // the way — CORS is what gates access here.
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser clients (curl, server-to-server, SSG build) with no Origin.
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        // Not an error: just respond without CORS headers so the browser blocks it.
        callback(null, false);
      },
    })
  );
  app.use(express.json({ limit: "64kb" }));

  app.use("/api", apiRouter);
  app.use("/", feedRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
