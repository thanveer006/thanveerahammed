import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiBase } from "@/lib/api";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

type Status = "idle" | "success" | "error";
type Field = "name" | "email" | "message";
type Fields = Record<Field, string>;
type FieldErrors = Partial<Record<Field, string>>;

const emptyFields: Fields = { name: "", email: "", message: "" };
/** Mirrors the API's limits (server/src/controllers/contact.controller.ts). */
const MAX_LENGTH: Record<Field, number> = { name: 200, email: 320, message: 5000 };
/** The API is on a free tier that can cold-start for tens of seconds; bound the wait. */
const SUBMIT_TIMEOUT_MS = 30_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: Field[] = ["name", "email", "message"];

function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Please enter your name.";
  if (!values.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.message) errors.message = "Please write a message.";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [pending, setPending] = useState(false);
  const reducedMotion = useReducedMotion();
  // State updates are async, so a fast double-submit could slip past `disabled`.
  const inFlight = useRef(false);

  const update = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    if (fieldErrors[field]) setFieldErrors((errs) => ({ ...errs, [field]: undefined }));
    if (status === "success") setStatus("idle");
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;

    const values: Fields = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      message: fields.message.trim(),
    };
    // noValidate is set (for consistent, accessible messaging), so validate here.
    const errors = validate(values);
    setFieldErrors(errors);
    const firstInvalid = FIELD_ORDER.find((f) => errors[f]);
    if (firstInvalid) {
      setStatus("idle");
      setErrorMessage(undefined);
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    inFlight.current = true;
    setPending(true);
    setStatus("idle");
    setErrorMessage(undefined);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
    const company = new FormData(form).get("company");

    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: typeof company === "string" ? company : "" }),
        signal: controller.signal,
      });
      const body = (await res.json().catch((jsonErr) => {
        // A slow/aborted body read rejects too — surface it to the outer catch
        // (which distinguishes AbortError) instead of masking it as a server error.
        if (controller.signal.aborted) throw jsonErr;
        return {};
      })) as { status?: string; message?: string; error?: string };

      if (res.ok && body.status === "success") {
        setStatus("success");
        setFields(emptyFields);
        setFieldErrors({});
      } else {
        setStatus("error");
        setErrorMessage(
          body.message ??
            (res.status === 429
              ? "Too many messages sent — please try again later."
              : "Something went wrong. Please try again.")
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof DOMException && err.name === "AbortError"
          ? "The server took too long to respond. Please try again in a moment."
          : "Couldn't reach the server. Check your connection and try again."
      );
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setPending(false);
    }
  }

  const fieldProps = (field: Field) => ({
    id: field,
    name: field,
    required: true,
    maxLength: MAX_LENGTH[field],
    value: fields[field],
    onChange: update(field),
    disabled: pending,
    "aria-invalid": fieldErrors[field] ? true : undefined,
    "aria-describedby": fieldErrors[field] ? `${field}-error` : undefined,
  });

  const errorText = (field: Field) =>
    fieldErrors[field] ? (
      <p id={`${field}-error`} className="flex items-center gap-1.5 text-sm text-destructive">
        <AlertCircle aria-hidden className="size-3.5 shrink-0" />
        {fieldErrors[field]}
      </p>
    ) : null;

  const messageLength = fields.message.length;
  const nearLimit = messageLength > MAX_LENGTH.message * 0.9;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-busy={pending}>
      {/* Honeypot — hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input {...fieldProps("name")} autoComplete="name" placeholder="Your name" />
          {errorText("name")}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...fieldProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          {errorText("email")}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <Label htmlFor="message">Message</Label>
          {nearLimit ? (
            <span className="font-mono text-xs text-muted-foreground tabular-nums" aria-live="polite">
              {messageLength} / {MAX_LENGTH.message}
            </span>
          ) : null}
        </div>
        <Textarea {...fieldProps("message")} placeholder="What are you looking to build?" rows={5} />
        {errorText("message")}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
          {pending ? "Sending…" : "Send Message"}
        </Button>

        {/* Always-mounted live region so screen readers announce the outcome reliably. */}
        <div aria-live="polite" className="min-h-5 sm:text-right">
          <AnimatePresence mode="wait">
            {status !== "idle" && (
              <motion.p
                key={status}
                role={status === "success" ? "status" : "alert"}
                initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={`flex items-center gap-2 text-sm ${status === "success" ? "text-success" : "text-destructive"}`}
              >
                {status === "success" ? (
                  <CheckCircle2 aria-hidden className="size-4 shrink-0" />
                ) : (
                  <AlertCircle aria-hidden className="size-4 shrink-0" />
                )}
                {status === "success" ? "Message sent. I'll get back to you soon." : errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
