import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must be at least 2 characters"
    )
    .max(
      100,
      "Name is too long"
    ),

  email: z
    .string()
    .trim()
    .email(
      "Enter a valid email address"
    )
    .max(
      200,
      "Email is too long"
    ),

  company: z
    .string()
    .trim()
    .max(
      200,
      "Company name is too long"
    ),

  message: z
    .string()
    .trim()
    .min(
      10,
      "Message must be at least 10 characters"
    )
    .max(
      5000,
      "Message is too long"
    ),

  website: z
    .string()
    .max(
      0,
      "Spam detected"
    )
    .optional()
    .or(z.literal("")),
});

export type ContactFormValues =
  z.infer<typeof contactSchema>;