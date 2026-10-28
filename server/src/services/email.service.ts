import { Resend } from "resend";
import { env } from "../config/env.js";

const SEND_TIMEOUT_MS = 10_000;

/** Collapses CR/LF and other control characters so user input can't break out of a header line. */
// eslint-disable-next-line no-control-regex
const singleLine = (value: string) => value.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ").trim();

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
    const name = singleLine(input.name).slice(0, 100) || "Anonymous";
    const email = singleLine(input.email);
    let timer: NodeJS.Timeout | undefined;
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Resend request timed out after ${SEND_TIMEOUT_MS}ms`)),
        SEND_TIMEOUT_MS
      );
    });
    const { error } = await Promise.race([
      resend.emails.send({
        from,
        to,
        replyTo: email,
        subject: `New message from ${name} (portfolio site)`,
        text: `From: ${name} <${email}>\n\n${input.message}`,
      }),
      timeout,
    ]).finally(() => clearTimeout(timer));

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
