import { z } from "zod";

export const AuthorIdentificationSchema = z
  .object({
    name: z.string().min(1).trim(),

    birthPlace: z
      .string()
      .transform((val) => val?.trim() || null)
      .nullable(),

    birthDate: z
      .string()
      .transform((val) => {
        const trimmed = val?.trim();
        return trimmed === "" ? null : new Date(trimmed);
      })
      .refine((val) => val === null || !isNaN(val.getTime?.()), {
        message: "Birth date must be a valid date",
      })
      .refine((val) => val === null || val <= new Date(), {
        message: "Birth date cannot be in the future",
      })
      .nullable(),

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
        message: "Death date must be a valid date",
      })
      .nullable(),
  })
  .refine(
    (data) => {
      if (!data.birthDate || !data.deathDate) return true;
      return data.deathDate > data.birthDate;
    },
    {
      message: "Death date must be after birth date",
      path: ["deathDate"],
    }
  );

export type AuthorIdentification = z.infer<typeof AuthorIdentificationSchema>;
