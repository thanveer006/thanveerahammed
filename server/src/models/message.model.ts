import { Schema, model, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, maxlength: 320 },
    message: { type: String, required: true, maxlength: 5000 },
    /** Whether the Resend email dispatch succeeded for this submission. */
    emailed: { type: Boolean, default: false },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

export type MessageDoc = InferSchemaType<typeof messageSchema>;
export const Message = model("Message", messageSchema);
