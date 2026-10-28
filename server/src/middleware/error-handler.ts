import type { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export function notFound(_req: Request, res: Response) {
  res.removeHeader("Cache-Control");
  res.status(404).json({ error: "Not found" });
}

/** Client errors raised by body-parser (malformed JSON, payload too large, …). */
function parserStatus(err: unknown): number | undefined {
  if (typeof err !== "object" || err === null) return undefined;
  const { status, type } = err as { status?: unknown; type?: unknown };
  if (typeof type !== "string" || !type.startsWith("entity.")) return undefined;
  return typeof status === "number" && status >= 400 && status < 500 ? status : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (res.headersSent) return;
  res.removeHeader("Cache-Control");
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }
  const status = parserStatus(err);
  if (status) {
    return res.status(status).json({
      error: status === 413 ? "Request body too large" : "Invalid request body",
    });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
}
