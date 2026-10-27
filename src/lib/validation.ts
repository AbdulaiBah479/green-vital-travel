import { z } from "zod";

// A field real visitors never see or fill — positioned off-screen and
// aria-hidden in every form. Bots that blindly fill every input on a page
// trip this; a human never can, since they can't see it exists. Caught
// submissions get a normal-looking success response (never told they were
// caught) so scrapers don't learn to route around it.
export const HONEYPOT_FIELD = "companyWebsite";

export function isSpam(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address."),
  subject: z.string().trim().min(1, "Please choose a subject."),
  message: z.string().trim().min(1, "Please enter a message."),
});

export const bookingSchema = z.object({
  tourSlug: z.string().trim().min(1),
  tourTitle: z.string().trim().min(1),
  departureDate: z.string().trim().min(1, "Please choose a departure date."),
  travelers: z.coerce.number().int().min(1).max(20),
  leadName: z.string().trim().min(1, "Please enter the lead traveler's name."),
  leadEmail: z.string().trim().min(1).email("Please enter a valid email address."),
  leadPhone: z.string().trim().optional(),
  addOns: z
    .object({
      insurance: z.boolean().default(false),
      transfer: z.boolean().default(false),
      roomUpgrade: z.boolean().default(false),
    })
    .default({ insurance: false, transfer: false, roomUpgrade: false }),
  total: z.coerce.number().min(0),
  notes: z.string().trim().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Please enter your email.").email("Please enter a valid email address."),
});

export const reviewSchema = z.object({
  tourSlug: z.string().trim().optional(),
  service: z.string().trim().max(60).optional(),
  rating: z.coerce.number().int().min(1).max(5),
  name: z.string().trim().min(1, "Please enter your name.").max(80, "Please use a shorter name."),
  body: z
    .string()
    .trim()
    .min(1, "Please share a few words about your experience.")
    .max(1200, "Please keep your review under 1,200 characters."),
});

export function firstIssueMessage(error: z.ZodError, fallback: string): string {
  return error.issues[0]?.message || fallback;
}
