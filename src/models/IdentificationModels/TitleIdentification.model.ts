import { z } from "zod";

export const TitleIdentificationSchema = z.object({
  name: z.string().min(1).trim(),
  attribution: z.string().trim().optional(),
  translation: z.string().trim().optional(),
});

export type TitleIdentification = z.infer<typeof TitleIdentificationSchema>
