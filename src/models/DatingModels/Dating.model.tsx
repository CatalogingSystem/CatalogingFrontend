import { z } from "zod";

const PeriodEnum = [
  "BeginningOfCentury",
  "MidCentury",
  "EndOfCentury",
  "FirstHalfOfCentury",
  "SecondHalfOfCentury",
  "FirstThirdOfCentury",
  "SecondThirdOfCentury",
  "LastThirdOfCentury",
  "FirstQuarterOfCentury",
  "SecondQuarterOfCentury",
  "ThirdQuarterOfCentury",
  "LastQuarterOfCentury",
] as const;

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

const dateFields = z.object({
  exact: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .optional()
    .nullable(),
  approximate: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .optional()
    .nullable(),
  probable: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .optional()
    .nullable(),
  bc: numericString.optional().nullable(),
  year: numericString.optional().nullable(),
  month: numericString.optional().nullable(),
  day: numericString.optional().nullable(),
});

export const DatingSchema = z.object({
  expediente: positiveNumericString,
  simpleDate: dateFields.optional().nullable(),
  dateRange: z
    .object({
      from: dateFields.optional().nullable(),
      to: dateFields.optional().nullable(),
    })
    .optional()
    .nullable(),
  approximateDating: z
    .object({
      fromCentury: z.enum(PeriodEnum).optional().nullable().default(null),
      toCentury: z.enum(PeriodEnum).optional().nullable().default(null),
    })
    .optional()
    .nullable(),
  notes: z
    .object({
      textualDate: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .optional()
        .nullable(),
      initialDateNotes: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .optional()
        .nullable(),
      finalDateNotes: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .optional()
        .nullable(),
      observations: z
        .string()
        .transform((val) => (val === "" ? null : val))
        .optional()
        .nullable(),
    })
    .optional()
    .nullable(),
});

export type DatingFormValues = z.infer<typeof DatingSchema>;
