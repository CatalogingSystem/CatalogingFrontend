import { z } from "zod";

const numericString = z
  .string()
  .transform((val) => (val === "" ? null : val))
  .refine((val) => val === null || !isNaN(Number(val)), {
    message: "Debe ser un número",
  });

const positiveNumericString = numericString.refine(
  (val) => val === null || Number(val) > 0,
  {
    message: "Debe ser mayor a 0",
  }
);

const optionalString = z
  .string()
  .transform((val) => (val === "" ? null : val))
  .optional()
  .nullable();

export const ConservationSchema = z.object({
  expediente: positiveNumericString,
  affectedArea: optionalString.default(null),
  length: optionalString.default(null),
  width: optionalString.default(null),
  depth: optionalString.default(null),
  reports: optionalString.default(null),
  analysisTypes: optionalString.default(null),
  results: optionalString.default(null),
  treatmentType: optionalString.default(null),
  description: optionalString.default(null),
  specialConditions: optionalString.default(null),
  observations: optionalString.default(null),
  notes: optionalString.default(null),
});

export type Conservation = z.infer<typeof ConservationSchema>;
