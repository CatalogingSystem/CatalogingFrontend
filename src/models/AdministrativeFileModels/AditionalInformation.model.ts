import { z } from "zod";

export const AdditionalInformationSchema = z.object({
  expedienteAnterior: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => val === undefined || val === "" || Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  asunto: z.string().optional(),
  peticionTransferencia: z.boolean(),
  historial: z.string().optional(),
  archivoDocumental: z.string().optional(),
  observaciones: z.string().optional(),
});

export type AdditionalInformationFormValues = z.infer<
  typeof AdditionalInformationSchema
>;
