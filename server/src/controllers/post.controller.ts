import type { Request, Response } from "express";
import { Post } from "../models/post.model.js";
import { serializePost, serializePostMeta } from "../views/serializers.js";

export async function listPosts(_req: Request, res: Response) {
  // `readingTime` is stored, so the list never needs the markdown bodies.
  const posts = await Post.find().select("-content").sort({ date: -1 }).lean();
  res.json(posts.map(serializePostMeta));
}

export async function getPost(req: Request, res: Response) {
  const post = await Post.findOne({ slug: req.params.slug }).lean();
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(serializePost(post));
}
