import { Resend } from "resend";
import { env } from "../config/env.js";

export type SendResult = { ok: true } | { ok: false; reason: "unconfigured" | "error" };

/**
 * Sends the contact-form email through Resend. Ported from the previous Next.js
 * server action (`lib/actions/contact.ts`). Returns a discriminated result so the
 * controller can keep the same user-facing messaging as before.
 */
export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}): Promise<SendResult> {
  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: input.email,
      subject: `New message from ${input.name} (portfolio site)`,
      text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { ok: false, reason: "error" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { ok: false, reason: "error" };
  }
}
