import { z } from "zod";

export const MaterialIdentificationSchema = z.object({
  materialName: z.string().min(1).trim(),
  describedPart: z.string().trim().optional(),
  colors: z.string().trim().optional(),
});

export type MaterialIdentification = z.infer<typeof MaterialIdentificationSchema>
