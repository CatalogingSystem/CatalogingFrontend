import { z } from "zod";
import { SectionIdentificationSchema } from "./SectionIdentification.model";
import { TypologyIdentificationSchema } from "./TypologyIdentification.model";
import { SpecificNameIdentificationSchema } from "./SpecificNameIdentification.model";
import { AuthorIdentificationSchema } from "./AuthorIdentification.model";
import { TitleIdentificationSchema } from "./TitleIdentification.model";
import { MaterialIdentificationSchema } from "./MaterialIdentification.model";
import { TechniquesIdentificationSchema } from "./TechniquesIdentification.model";

export const IdentificationSchema = z.object({
  section: SectionIdentificationSchema,
  expediente: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  inventory: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  numberOfObjects: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  genericClassification: z.string().min(1).trim(),
  objectName: z.string().min(1).trim(),
  observations: z.string().trim().optional(),
  typology: TypologyIdentificationSchema,
  specificName: SpecificNameIdentificationSchema,
  author: AuthorIdentificationSchema,
  title: TitleIdentificationSchema,
  material: MaterialIdentificationSchema,
  techniques: TechniquesIdentificationSchema,
});

export type IdentificationFormValues = z.infer<typeof IdentificationSchema>;
