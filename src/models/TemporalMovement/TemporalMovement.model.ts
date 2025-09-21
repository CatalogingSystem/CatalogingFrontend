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

const requiredString = (fieldName: string) =>
  z
    .string({ message: `${fieldName} es requerido` })
    .min(1, { message: `${fieldName} es requerido` });

const validOptionalDate = z.preprocess(
  (val) => {
    const trimmed = typeof val === "string" ? val.trim() : "";
    if (trimmed === "") return null;
    const date = new Date(trimmed);
    return isNaN(date.getTime()) ? null : date.toISOString();
  },
  z
    .string()
    .refine((val) => val === null || !isNaN(Date.parse(val)), {
      message: "La fecha final debe ser válida",
    })
    .optional()
    .nullable()
    .default(null)
);

const requiredDate = (fieldName: string) =>
  z
    .preprocess((val) => {
      const trimmed = typeof val === "string" ? val.trim() : "";
      return trimmed === "" ? null : new Date(trimmed).toISOString();
    }, z.string({ message: `${fieldName} es requerido` }))
    .refine((val) => !isNaN(Date.parse(val)), {
      message: `${fieldName} debe ser una fecha válida`,
    });

const MovementTypes = [
  "Restoration",
  "Conservation",
  "InternalTemporaryExhibition",
  "ExternalTemporaryExhibition",
  "LaboratoryAnalysis",
  "PhotographicRecord",
  "Studies",
  "PermanentExhibitionSiteChange",
  "Relocation",
  "Loan",
  "Disposal",
] as const;

const personSchema = z.object({
  firstName: requiredString("Nombre"),
  lastName: requiredString("Apellido"),
  identityCard: requiredString("Cédula de Identidad"),
  institutionalId: requiredString("ID Institucional"),
  institution: requiredString("Institución"),
  address: requiredString("Dirección"),
  locality: requiredString("Localidad"),
  province: requiredString("Provincia"),
  department: requiredString("Departamento"),
  country: requiredString("País"),
  phoneNumber: requiredString("Teléfono"),
  email: requiredString("Correo Electrónico"),
  references: optionalString,
  observations: optionalString,
});

export const TemporalMovementSchema = z.object({
  movementType: z.enum(MovementTypes),
  expediente: positiveNumericString,
  applicant: personSchema,
  representative: personSchema,
  entity: optionalString,
  transferLocation: requiredString("Lugar de Transferencia"),
  departureDate: requiredDate("Fecha de Salida"),
  returnDate: validOptionalDate,
  document: optionalString,
  code: optionalString,
  date: validOptionalDate,
  insurer: optionalString,
  policy: optionalString,
  notes: optionalString,
  departure: z.object({
    company: optionalString,
    location: optionalString,
    date: validOptionalDate,
    time: optionalString,
    notes: optionalString,
  }),
  return: z.object({
    company: optionalString,
    location: optionalString,
    date: validOptionalDate,
    time: optionalString,
    notes: optionalString,
  }),
  observations: optionalString,
});

export type TemporalMovement = z.infer<typeof TemporalMovementSchema>;
export type TemporalMovementResponse = z.infer<
  typeof TemporalMovementSchema
> & {
  id: string;
};
