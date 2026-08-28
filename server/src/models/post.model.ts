import { Schema, model, InferSchemaType } from "mongoose";

const postSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    tags: { type: [String], default: [] },
    /** Human-readable estimate ("3 min read"), computed once at seed time. */
    readingTime: { type: String, required: true },
    /** Raw markdown body (rendered on the client with react-markdown). */
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export type PostDoc = InferSchemaType<typeof postSchema>;
export const Post = model("Post", postSchema);
