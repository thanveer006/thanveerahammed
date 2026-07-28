"use server";

import { Resend } from "resend";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  // Honeypot field — bots tend to fill every input, real users never see it.
  const company = String(formData.get("company") ?? "").trim();

  if (company) {
    return { status: "success" };
  }

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Message is too long." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Resend's shared sandbox sender is rate-limited and often lands in spam — swap in a
  // domain-verified address (see Resend's domain setup) via CONTACT_FROM_EMAIL for production.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact Form <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured.");
    return {
      status: "error",
      message: "The contact form isn't fully configured yet — please email me directly instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New message from ${name} (portfolio site)`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: "Something went wrong sending your message. Please try again." };
    }

    return { status: "success" };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error", message: "Something went wrong sending your message. Please try again." };
  }
}
