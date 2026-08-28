import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny, infer as ZodInfer } from "zod";

/**
 * Validates `req.body` against a Zod schema, replacing it with the parsed value.
 * On failure, responds 400 with a flat message (no throw — keeps the contact
 * endpoint's response shape predictable).
 */
export function validateBody<S extends ZodTypeAny>(schema: S) {
  return (req: Request<unknown, unknown, ZodInfer<S>>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message =
        result.error.issues[0]?.message ?? "Invalid request body.";
      return res.status(400).json({ status: "error", message });
    }
    req.body = result.data;
    next();
  };
}
