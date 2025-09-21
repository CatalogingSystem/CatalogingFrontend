import { z } from "zod";

export const TechniquesIdentificationSchema = z.object({
  techniqueName: z
    .string()
    .min(1, { message: "El nombre de la técnica es obligatorio" })
    .trim(),
  describedPart: z.string().trim().optional(),
});

export type TechniquesIdentification = z.infer<
  typeof TechniquesIdentificationSchema
>;
