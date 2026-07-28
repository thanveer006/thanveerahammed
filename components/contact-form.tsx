"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactMessage, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="size-4 animate-spin" /> : null}
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

const emptyFields = { name: "", email: "", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState(emptyFields);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setFields(emptyFields);
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
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
        <SubmitButton pending={pending} />

        {state.status === "success" && (
          <p role="status" className="flex items-center gap-2 text-sm text-success">
            <CheckCircle2 className="size-4" />
            Message sent — I&apos;ll get back to you soon.
          </p>
        )}
        {state.status === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
