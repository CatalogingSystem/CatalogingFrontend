import { z } from "zod";

export const SectionIdentificationSchema = z.object({
  room: z.string().min(1, { message: "La sala es obligatoria" }).trim(),
  panel: z.string().trim().optional(),
  displayCase: z.string().trim().optional(),
  easel: z.string().trim().optional(),
  storage: z.string().trim().optional(),
  courtyarb: z.string().trim().optional(),
  pillar: z.string().trim().optional(),
  others: z.string().trim().optional(),
});

export type SectionIdentification = z.infer<typeof SectionIdentificationSchema>;
