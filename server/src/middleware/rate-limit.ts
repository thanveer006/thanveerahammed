import rateLimit from "express-rate-limit";

/** Contact endpoint only: 5 submissions per 10 minutes per IP. */
export const contactRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many messages sent — please try again later.",
  },
});

/** Generous per-IP cap on the whole API so a scraper can't hammer Mongo. */
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests" },
});
