import { z } from "zod";

export const TechniquesIdentificationSchema = z.object({
  techniqueName: z.string().min(1).trim(),
  describedPart: z.string().trim().optional(),
});

export type TechniquesIdentification = z.infer<typeof TechniquesIdentificationSchema>
