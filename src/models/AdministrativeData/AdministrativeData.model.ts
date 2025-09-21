import { z } from "zod";

const entryForms = [
  "SelectAnOption",
  "ByConfiscation",
  "Purchase",
  "Dation",
  "Excavation",
  "Bequest",
  "Donation",
  "OrderingAndReordering",
  "Exchange",
  "Awards",
  "Usucapion",
  "RegistrationByReintegration",
  "ChangeOfAssignment",
  "Offering",
  "OwnProduction",
  "Collection",
  "ForStudy",
  "Exhibition",
  "Conservation",
  "PublicOwnershipDeposit",
  "ThirdPartyDeposit",
  "JudicialDeposit",
  "DepositPriorToAcquisition",
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
);

const optionalString = z
  .string()
  .transform((val) => (val === "" ? null : val))
  .optional()
  .nullable();

export const AdministrativeDataSchema = z.object({
  fileNumber: positiveNumericString,
  entryDate: validOptionalDate,
  entryForm: z
    .enum(entryForms)
    .optional()
    .nullable()
    .default(null)
    .transform((val) => (val === "SelectAnOption" ? null : val)),
  entrySource: optionalString,
  collectionType: optionalString,
  catalogingDate: validOptionalDate,
  observations: optionalString,
  copiesReproductions: z
    .object({
      author: optionalString,
      originalTitle: optionalString,
      method: optionalString,
      format: optionalString,
      originalDestination: optionalString,
      location: optionalString,
      date: validOptionalDate,
      notes: optionalString,
    })
    .default({
      author: null,
      originalTitle: null,
      method: null,
      format: null,
      originalDestination: null,
      location: null,
      date: null,
      notes: null,
    }),
  valuation: z
    .object({
      value: optionalString,
      appraiser: optionalString,
      date: validOptionalDate,
      notes: optionalString,
    })
    .default({
      value: null,
      appraiser: null,
      date: null,
      notes: null,
    })
    .optional()
    .nullable(),
  cataloger: z
    .object({
      firstName: optionalString,
      lastName: optionalString,
      identityCard: optionalString,
      institution: optionalString,
      address: optionalString,
      locality: optionalString,
      province: optionalString,
      department: optionalString,
      country: optionalString,
      phoneNumber: optionalString,
      email: optionalString,
      references: optionalString,
      observations: optionalString,
    })
    .default({
      firstName: null,
      lastName: null,
      identityCard: null,
      institution: null,
      address: null,
      locality: null,
      province: null,
      department: null,
      country: null,
      phoneNumber: null,
      email: null,
      references: null,
      observations: null,
    })
    .optional()
    .nullable(),
});

export type AdministrativeData = z.infer<typeof AdministrativeDataSchema>;
