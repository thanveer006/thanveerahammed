import { Schema, model, InferSchemaType } from "mongoose";

const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyUrl: { type: String },
    start: { type: String, required: true },
    end: { type: String, required: true },
    type: { type: String, required: true },
    impact: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    tech: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ExperienceDoc = InferSchemaType<typeof experienceSchema>;
export const Experience = model("Experience", experienceSchema);
