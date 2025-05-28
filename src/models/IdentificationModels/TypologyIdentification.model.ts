import { z } from "zod";

export const TypologyIdentificationSchema = z.object({
  type: z.string().min(1).trim(),
  subtype: z.string().trim().optional(),
  class: z.string().trim().optional(),
  subclass: z.string().trim().optional(),
  order: z.string().trim().optional(),
  suborder: z.string().trim().optional(),
});

export type TypologyIdentification = z.infer<typeof TypologyIdentificationSchema>
