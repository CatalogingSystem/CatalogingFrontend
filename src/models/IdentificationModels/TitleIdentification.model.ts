import { z } from "zod";

export const TitleIdentificationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del título es obligatorio" })
    .trim(),
  attribution: z.string().trim().optional(),
  translation: z.string().trim().optional(),
});

export type TitleIdentification = z.infer<typeof TitleIdentificationSchema>;
