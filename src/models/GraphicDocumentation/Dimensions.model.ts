import { z } from "zod";

export const DimensionsSchema = z.object({
  width: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "El ancho debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "El ancho debe ser mayor a 0",
    }),
  height: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "La altura debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "La altura debe ser mayor a 0",
    }),
});

export type DimensionsFormValues = z.infer<typeof DimensionsSchema>;
