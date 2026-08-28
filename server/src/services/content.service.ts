import readingTime from "reading-time";

/**
 * Shapes a stored post document into the API DTO. `readingTime` is derived on the
 * fly from the markdown body, exactly as the old `lib/blog.ts` did.
 */
export function toPostMeta(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}, content: string) {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags ?? [],
    readingTime: readingTime(content).text,
  };
}
