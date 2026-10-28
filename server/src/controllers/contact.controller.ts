import type { Request, Response } from "express";
import { z } from "zod";
import { Message } from "../models/message.model.js";
import { sendContactEmail } from "../services/email.service.js";

const requiredField = { required_error: "Please fill in every field." };

export const contactSchema = z.object({
  name: z.string(requiredField).trim().min(1, "Please fill in every field.").max(200),
  email: z
    .string(requiredField)
    .trim()
    .min(1, "Please fill in every field.")
    .max(320)
    .email("Please enter a valid email address."),
  message: z
    .string(requiredField)
    .trim()
    .min(1, "Please fill in every field.")
    .max(5000, "Message is too long."),
  // Honeypot — bots tend to fill every input, real users never see it.
  company: z.string().optional(),
});

type ContactInput = z.infer<typeof contactSchema>;

export async function submitContact(
  req: Request<unknown, unknown, ContactInput>,
  res: Response
) {
  const { name, email, message, company } = req.body;

  // Silently accept honeypot hits — same as the old server action.
  if (company) {
    return res.json({ status: "success" });
  }

  const result = await sendContactEmail({ name, email, message });

  // Persisting is best-effort once the email went out: a DB hiccup must not turn
  // a delivered message into an error the visitor retries (duplicate emails).
  // De-duplicate retries: the same person resending the same message within 10
  // minutes (e.g. after an "email not configured" error) updates that row.
  try {
    const since = new Date(Date.now() - 10 * 60 * 1000);
    const existing = await Message.findOneAndUpdate(
      { email, message, createdAt: { $gte: since } },
      { emailed: result.ok }
    );
    if (!existing) {
      await Message.create({
        name,
        email,
        message,
        emailed: result.ok,
        userAgent: req.get("user-agent")?.slice(0, 500),
        ip: req.ip,
      });
    }
  } catch (err) {
    console.error("Contact form: failed to store message:", err);
    if (!result.ok) throw err;
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
