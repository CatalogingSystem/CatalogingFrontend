import { z } from "zod";

const today = new Date().toISOString().split("T")[0];

export const DatesSchema = z
  .object({
    initialDate: z.preprocess(
      (val) => {
        if (typeof val !== "string" || val === "") {
          return today;
        }
        return val;
      },
      z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Initial date must be a valid date",
        })
        .refine((val) => new Date(val) <= new Date(), {
          message: "Initial date cannot be in the future",
        })
    ),
    finalDate: z
      .string()
      .optional()
      .refine((val) => val === undefined || val === "" || !isNaN(Date.parse(val)), {
        message: "Final date must be a valid date",
      }),
  })
  .refine(
    (data) =>
      !data.finalDate || new Date(data.finalDate) > new Date(data.initialDate),
    {
      message: "Final date must be after initial date",
      path: ["finalDate"],
    }
  );

export type DatesFormValues = z.infer<typeof DatesSchema>;
