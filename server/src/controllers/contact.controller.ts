import type { Request, Response } from "express";
import { z } from "zod";
import { Message } from "../models/message.model.js";
import { sendContactEmail } from "../services/email.service.js";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please fill in every field.").max(200),
  email: z.string().trim().min(1, "Please fill in every field.").max(320),
  message: z
    .string()
    .trim()
    .min(1, "Please fill in every field.")
    .max(5000, "Message is too long."),
  // Honeypot — bots tend to fill every input, real users never see it.
  company: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(
  req: Request<unknown, unknown, ContactInput>,
  res: Response
) {
  const { name, email, message, company } = req.body;

  // Silently accept honeypot hits — same as the old server action.
  if (company) {
    return res.json({ status: "success" });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Please enter a valid email address." });
  }

  const result = await sendContactEmail({ name, email, message });

  // Persist the submission, de-duplicating retries: if the same person resends
  // the same message within 10 minutes (e.g. after an "email not configured"
  // error), update that row instead of inserting a new one.
  const since = new Date(Date.now() - 10 * 60 * 1000);
  const existing = await Message.findOne({
    email,
    message,
    createdAt: { $gte: since },
  });
  if (existing) {
    await Message.findByIdAndUpdate(existing._id, { emailed: result.ok });
  } else {
    await Message.create({
      name,
      email,
      message,
      emailed: result.ok,
      userAgent: req.get("user-agent"),
      ip: req.ip,
    });
  }

  if (!result.ok) {
    if (result.reason === "unconfigured") {
      return res.status(500).json({
        status: "error",
        message:
          "The contact form isn't fully configured yet — please email me directly instead.",
      });
    }
    return res.status(502).json({
      status: "error",
      message: "Something went wrong sending your message. Please try again.",
    });
  }

  res.json({ status: "success" });
}
