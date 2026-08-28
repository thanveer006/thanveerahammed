import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { validateBody } from "../middleware/validate.js";
import { contactRateLimit } from "../middleware/rate-limit.js";
import { contactSchema, submitContact } from "../controllers/contact.controller.js";

export const contactRoutes = Router();

contactRoutes.post(
  "/",
  contactRateLimit,
  validateBody(contactSchema),
  asyncHandler(submitContact)
);
