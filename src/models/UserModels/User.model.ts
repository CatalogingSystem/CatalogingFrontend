import { z } from "zod";

export const UserRole = ["Director", "Investigador"] as const;
export const UserPermissionLevel = ["ReadOnly", "ReadWrite"] as const;

export const UserSchema = z.object({
  username: z
    .string({ message: "El nombre de usuario es requerido" })
    .min(1, { message: "El nombre de usuario no puede estar vacío" }),
  password: z
    .string({ message: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  role: z.enum(UserRole),
  permissionLevel: z.enum(UserPermissionLevel).optional().nullable(),
  tenantId: z.string(),
});

export const UserUpdateSchema = UserSchema.omit({
  password: true,
});

export const UserUpdatePasswordSchema = z
  .object({
    password: z
      .string({ message: "La contraseña es requerida" })
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string({ message: "La confirmación de la contraseña es requerida" })
      .min(8, {
        message:
          "La confirmación de la contraseña debe tener al menos 8 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type UserFormValues = z.infer<typeof UserSchema>;
export type UserUpdatePasswordValues = z.infer<typeof UserUpdatePasswordSchema>;
export type UserUpdateValues = Omit<UserFormValues, "password">;
