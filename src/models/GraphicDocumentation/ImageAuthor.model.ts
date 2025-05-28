import { z } from "zod";

export const ImageAuthorSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  identityCard: z.string().optional(),
  institutionalId: z.string().optional(),
  institution: z.string().optional(),
  address: z.string().optional(),
  locality: z.string().optional(),
  province: z.string().optional(),
  department: z.string().optional(),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().email({ message: "Invalid email format" }).optional()
  ),
  references: z.string().optional(),
});

export type ImageAuthorFormValues = z.infer<typeof ImageAuthorSchema>;
