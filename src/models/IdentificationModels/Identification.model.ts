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
      message: "El expediente debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "El expediente debe ser mayor a 0",
    }),

  inventory: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "El inventario debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "El inventario debe ser mayor a 0",
    }),

  numberOfObjects: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "La cantidad de objetos debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "La cantidad de objetos debe ser mayor a 0",
    }),

  genericClassification: z
    .string()
    .min(1, { message: "La clasificación genérica es obligatoria" })
    .trim(),

  objectName: z
    .string()
    .min(1, { message: "El nombre del objeto es obligatorio" })
    .trim(),

  observations: z
    .string()
    .min(1, { message: "Las observaciones son obligatorias" })
    .trim(),

  typology: TypologyIdentificationSchema,
  specificName: SpecificNameIdentificationSchema,
  author: AuthorIdentificationSchema,
  title: TitleIdentificationSchema,
  material: MaterialIdentificationSchema,
  techniques: TechniquesIdentificationSchema,
});

export type IdentificationFormValues = z.infer<typeof IdentificationSchema>;
