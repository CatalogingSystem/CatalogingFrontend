import { z } from "zod";

export const AuthorIdentificationSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).trim(),

    birthPlace: z
      .string()
      .min(1, { message: "El lugar de nacimiento es obligatorio" }),

    birthDate: z
      .string()
      .transform((val) => {
        const trimmed = val?.trim();
        return trimmed === "" ? null : new Date(trimmed);
      })
      .refine((val) => val === null || !isNaN(val.getTime?.()), {
        message: "La fecha de nacimiento debe ser válida",
      })
      .refine((val) => val === null || val <= new Date(), {
        message: "La fecha de nacimiento no puede estar en el futuro",
      }),

    deathPlace: z
      .string()
      .transform((val) => val?.trim() || null)
      .nullable(),

    deathDate: z
      .string()
      .transform((val) => {
        const trimmed = val?.trim();
        return trimmed === "" ? null : new Date(trimmed);
      })
      .refine((val) => val === null || !isNaN(val.getTime?.()), {
        message: "La fecha de defunción debe ser válida",
      })
      .nullable(),
  })
  .refine(
    (data) => {
      if (!data.birthDate || !data.deathDate) return true;
      return data.deathDate > data.birthDate;
    },
    {
      message: "La fecha de defunción debe ser posterior a la de nacimiento",
      path: ["deathDate"],
    }
  );

export type AuthorIdentification = z.infer<typeof AuthorIdentificationSchema>;
