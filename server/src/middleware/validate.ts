import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

/**
 * Validates `req.body` against a Zod schema, replacing it with the parsed value.
 * On failure, responds 400 with the contact endpoint's `{status,message}` shape
 * (no throw, so the client always gets a message it can show).
 */
export function validateBody<S extends z.ZodType>(schema: S) {
  return (req: Request<unknown, unknown, z.infer<S>>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid request body.";
      return res.status(400).json({ status: "error", message });
    }
    req.body = result.data;
    next();
  };
}
