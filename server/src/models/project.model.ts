import { Schema, model, InferSchemaType } from "mongoose";

const challengeSolutionSchema = new Schema(
  {
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
  },
  { _id: false }
);

const architectureLayerSchema = new Schema(
  {
    layer: { type: String, required: true },
    detail: { type: String, required: true },
  },
  { _id: false }
);

const codeSnippetSchema = new Schema(
  {
    label: { type: String, required: true },
    code: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    oneLiner: { type: String, required: true },
    description: { type: String, required: true },
    tech: { type: [String], default: [] },
    year: { type: String, required: true },
    timeline: { type: String, required: true },
    role: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    architectureLayers: { type: [architectureLayerSchema], default: [] },
    features: { type: [String], default: [] },
    challenge: { type: challengeSolutionSchema, required: true },
    results: { type: [String], default: [] },
    codeSnippet: { type: codeSnippetSchema, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export const Project = model("Project", projectSchema);
