import { z } from "zod";

export const CustomizeSchema = z.object({
  general: z.object({
    header: z.string().default("#000000"),
    background: z.string().default("#FFFFFF"),
    steps: z.string().default("#000000"),
    selectedSteps: z.string().default("#000000"),
    primaryButton: z.string().default("#000000"),
    secondaryButton: z.string().default("#000000"),
  }),
  users: z.object({
    permissions: z.object({
      admin: z.string().default("#FF0000"),
      modification: z.string().default("#FFA500"),
      readOnly: z.string().default("#008000"),
    }),
    roles: z.object({
      director: z.string().default("#0000FF"),
      researcher: z.string().default("#800080"),
    }),
  }),
});

export type CustomizeFormValuesType = z.infer<typeof CustomizeSchema>;
