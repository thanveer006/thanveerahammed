import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiBase } from "@/lib/api";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

type Status = "idle" | "success" | "error";

const emptyFields = { name: "", email: "", message: "" };

export function ContactForm() {
  const [fields, setFields] = useState(emptyFields);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [pending, setPending] = useState(false);
  const reducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setStatus("idle");
    setErrorMessage(undefined);

    // The API is on a free tier that can cold-start for tens of seconds; bound the
    // wait so the button doesn't spin forever with no feedback.
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const res = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          company: String(data.get("company") ?? ""),
        }),
        signal: controller.signal,
      });
      const body = (await res.json().catch((jsonErr) => {
        // A slow/aborted body read rejects too — surface it to the outer catch
        // (which distinguishes AbortError) instead of masking it as a generic
        // server error.
        if (controller.signal.aborted) throw jsonErr;
        return {};
      })) as {
        status?: Status;
        message?: string;
      };

      if (res.ok && body.status === "success") {
        setStatus("success");
        form.reset();
        setFields(emptyFields);
      } else {
        setStatus("error");
        setErrorMessage(body.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof DOMException && err.name === "AbortError"
          ? "The server took too long to respond. Please try again in a moment."
          : "Something went wrong sending your message. Please try again."
      );
    } finally {
      clearTimeout(timeout);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            maxLength={200}
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            maxLength={320}
            value={fields.email}
            onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="What are you looking to build?"
          required
          maxLength={5000}
          rows={5}
          value={fields.message}
          onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? <Loader2 className="size-4 animate-spin" /> : null}
          {pending ? "Sending..." : "Send Message"}
        </Button>

        <AnimatePresence mode="wait">
          {status !== "idle" &&
            (() => {
              const isSuccess = status === "success";
              const Icon = isSuccess ? CheckCircle2 : AlertCircle;
              return (
                <motion.p
                  key={status}
                  role={isSuccess ? "status" : "alert"}
                  initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-2 text-sm ${isSuccess ? "text-success" : "text-destructive"}`}
                >
                  <Icon className="size-4" />
                  {isSuccess ? "Message sent — I'll get back to you soon." : errorMessage}
                </motion.p>
              );
            })()}
        </AnimatePresence>
      </div>
    </form>
  );
}
