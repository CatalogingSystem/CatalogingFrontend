import { z } from "zod";

export const SpecificNameIdentificationSchema = z.object({
  genericName: z.string().min(1).trim(),
  relatedTerms: z.string().trim().optional(),
  specificTerms: z.string().trim().optional(),
  usedBy: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type SpecificNameIdentification = z.infer<typeof SpecificNameIdentificationSchema>
