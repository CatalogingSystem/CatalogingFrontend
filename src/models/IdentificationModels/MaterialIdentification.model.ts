import { z } from "zod";

export const MaterialIdentificationSchema = z.object({
  materialName: z
    .string()
    .min(1, { message: "El nombre del material es obligatorio" })
    .trim(),
  describedPart: z.string().trim().optional(),
  colors: z.string().trim().optional(),
});

export type MaterialIdentification = z.infer<
  typeof MaterialIdentificationSchema
>;
