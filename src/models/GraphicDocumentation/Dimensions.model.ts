import { z } from "zod";

export const DimensionsSchema = z.object({
  width: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  height: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
});

export type DimensionsFormValues = z.infer<typeof DimensionsSchema>;
