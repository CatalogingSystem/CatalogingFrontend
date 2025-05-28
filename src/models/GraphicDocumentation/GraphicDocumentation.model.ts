import { z } from "zod";
import { ImageAuthorSchema } from "./ImageAuthor.model";
import { DimensionsSchema } from "./Dimensions.model";

export const ImageRecordSchema = z.object({
  expediente: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
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
      message: "Date must be a valid date",
    })
    .nullable(),
  supportTypes: z.array(z.string()).optional(),
  dimensions: DimensionsSchema.optional(),
  imageAuthor: ImageAuthorSchema.optional(),
  description: z.string().optional(),
  technicalData: z.string().optional(),
  generalObservations: z.string().optional(),
  images: z.array(z.any()).min(1),
});

export type ImageRecordFormValues = z.infer<typeof ImageRecordSchema>;
