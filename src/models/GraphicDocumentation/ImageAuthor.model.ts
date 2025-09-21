import { z } from "zod";

export const ImageAuthorSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es obligatorio" }).trim(),
  lastName: z.string().min(1, { message: "El apellido es obligatorio" }).trim(),
  identityCard: z.string().min(6, { message: "El número de documento debe tener al menos 6 caracteres" }).trim(),
  institutionalId: z.string().optional(),
  institution: z.string().optional(),
  address: z.string().optional(),
  locality: z.string().optional(),
  province: z.string().optional(),
  department: z.string().optional(),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string(),
  references: z.string().optional(),
});


export type ImageAuthorFormValues = z.infer<typeof ImageAuthorSchema>;
