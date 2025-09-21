import { z } from "zod";
import { ImageAuthorSchema } from "./ImageAuthor.model";
import { DimensionsSchema } from "./Dimensions.model";

export interface ImageFormItem {
  file: File | null;
  preview: string;
  isExisting?: boolean;
  url?: string;
}

export const ImageRecordSchema = z.object({
  expediente: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "El expediente debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "El expediente debe ser mayor a 0",
    }),
  genericControlNumber: z.string().optional(),
  specificControlNumber: z.string().optional(),
  date: z
    .string()
    .transform((val) => {
      const trimmed = val?.trim();
      return trimmed === "" ? null : new Date(trimmed);
    })
    .refine((val) => val === null || !isNaN(val.getTime?.()), {
      message: "La fecha debe ser válida",
    })
    .nullable(),
  supportTypes: z.array(z.string()).optional(),
  dimensions: DimensionsSchema.optional(),
  imageAuthor: ImageAuthorSchema.optional(),
  description: z
    .string()
    .min(1, { message: "La descripción es obligatoria" })
    .trim(),
  technicalData: z
    .string()
    .min(1, { message: "Los datos técnicos son obligatorios" })
    .trim(),
  generalObservations: z.string().optional(),
  images: z.array(z.any()).min(0),
  imageUrls: z.array(z.string()).optional(),
});

export type ImageRecordFormValues = z.infer<typeof ImageRecordSchema>;
