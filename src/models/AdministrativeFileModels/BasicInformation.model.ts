import { z } from "zod";

export const institutionEnum = [
  "UMRPSFXCH",
  "IglesiaDeChuquisaca",
  "InstitucionPublica",
  "InstitucionPrivada",
  "ColeccionPublica",
  "ColeccionPrivada",
  "PersonaJuridica",
  "PersonaNatural",
] as const;

export const documentTypeEnum = [
  "PorDecomiso",
  "Compra",
  "Dacion",
  "Excavacion",
  "Legado",
  "Donacion",
  "OrdenacionYReordenacion",
  "Permuta",
  "Premios",
  "Usucapion",
  "AltaPorReintegracion",
  "CambioDeAdscripcion",
  "Ofrenda",
  "ProduccionPropia",
  "Recoleccion",
  "DepositoDeTitularidadPublica",
  "DepositoDeTerceros",
  "Estudio",
  "Exposicion",
  "Conservacion",
  "DepositoJudicial",
  "DepositoPrevioAAdquisicion",
] as const;

export const BasicInformationSchema = z.object({
  institucion: z.enum(institutionEnum, { message: "Seleccione una institución" }),
  unidad: z.string().trim().min(1, { message: "La unidad es obligatoria" }),
  expediente: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "El expediente debe ser un número",
    })
    .refine((val) => Number(val) > 0, {
      message: "El expediente debe ser mayor a 0",
    }),
  serie: z.string(),
  documentoOrigen: z.enum(documentTypeEnum, { message: "Seleccione un tipo de documento" }),
});


export type BasicInformationFormValues = z.infer<typeof BasicInformationSchema>;
