import type { NextFunction, Request, Response } from "express";

/** Short public cache for read-only content endpoints (CDN/browser), with SWR. */
export function cacheControl(maxAgeSeconds: number, swrSeconds = maxAgeSeconds * 5) {
  const value = `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${swrSeconds}`;
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") res.setHeader("Cache-Control", value);
    next();
  };
}
