import type { Request, Response } from "express";
import {
  buildRobotsTxt,
  buildRssXml,
  buildSitemapXml,
} from "../services/feed.service.js";

export async function rss(_req: Request, res: Response) {
  res.type("application/xml; charset=utf-8").send(await buildRssXml());
}

export async function sitemap(_req: Request, res: Response) {
  res.type("application/xml; charset=utf-8").send(await buildSitemapXml());
}

export function robots(_req: Request, res: Response) {
  res.type("text/plain; charset=utf-8").send(buildRobotsTxt());
}
