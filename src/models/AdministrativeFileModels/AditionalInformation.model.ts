import { z } from "zod";

export const AdditionalInformationSchema = z.object({
  expedienteAnterior: z
    .string()
    .optional()
    .refine((val) => val === undefined || val === "" || !isNaN(Number(val)), {
      message: "El expediente anterior debe ser un número",
    })
    .refine((val) => val === undefined || val === "" || Number(val) > 0, {
      message: "El expediente anterior debe ser mayor a 0",
    }),
  asunto: z.string().optional(),
  peticionTransferencia: z.boolean().optional(),
  historial: z.string().optional(),
  archivoDocumental: z.string().optional(),
  observaciones: z.string().optional(),
});

export type AdditionalInformationFormValues = z.infer<
  typeof AdditionalInformationSchema
>;
