"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { contactSchema } from "@/lib/validation";
import Toast, { ToastState } from "@/components/Toast";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(() => ({
    ...initialState,
  }));

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const handleChange =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value = e.currentTarget.value;

      setValues((previous) => ({
        ...previous,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((previous) => ({
          ...previous,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({});

    const formValues: FormState = {
      name: values.name ?? "",
      email: values.email ?? "",
      company: values.company ?? "",
      message: values.message ?? "",
      website: values.website ?? "",
    };

    const parsed = contactSchema.safeParse(formValues);

    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};

      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;

        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
      });

      const data: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (!response.ok || !data.success) {
        setToast({
          type: "error",
          message: data.message ?? "Something went wrong.",
        });

        return;
      }

      setToast({
        type: "success",
        message: "Message sent. I'll get back to you soon.",
      });

      setValues({
        ...initialState,
      });
    } catch {
      setToast({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setSubmitting(false);

      window.setTimeout(() => {
        setToast(null);
      }, 4500);
    }
  };

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={values.name ?? ""}
            onChange={handleChange("name")}
            autoComplete="name"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-signal"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? "name-error" : undefined
            }
          />

          {errors.name && (
            <p
              id="name-error"
              className="mt-1.5 text-xs text-amber"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={values.email ?? ""}
            onChange={handleChange("email")}
            autoComplete="email"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-signal"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? "email-error" : undefined
            }
          />

          {errors.email && (
            <p
              id="email-error"
              className="mt-1.5 text-xs text-amber"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 block text-sm font-medium"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            value={values.company ?? ""}
            onChange={handleChange("company")}
            autoComplete="organization"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-signal"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? "company-error" : undefined
            }
          />

          {errors.company && (
            <p
              id="company-error"
              className="mt-1.5 text-xs text-amber"
            >
              {errors.company}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message ?? ""}
            onChange={handleChange("message")}
            className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-signal"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "message-error" : undefined
            }
          />

          {errors.message && (
            <p
              id="message-error"
              className="mt-1.5 text-xs text-amber"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">Website</label>

          <input
            id="website"
            name="website"
            type="text"
            value={values.website ?? ""}
            onChange={handleChange("website")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-medium text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitting ? (
            <>
              <Loader2
                size={15}
                className="animate-spin"
              />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>
      </motion.form>

      <Toast toast={toast} />
    </>
  );
}