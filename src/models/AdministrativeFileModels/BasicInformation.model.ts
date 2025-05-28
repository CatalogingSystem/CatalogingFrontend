import { z } from "zod";

export const institutionEnum = [
  "U.M.R.P.S.F.X.CH",
  "IglesiaDeChuquisaca",
  "InstitucionPublica",
  "InstitucionPrivada",
  "ColeccionPublica",
  "ColeccionPrivada",
  "PersonaJuridica",
  "PersonaNatural",
] as const 

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
  institucion: z.enum(institutionEnum, {message: 'Seleccione una opcion'}),
  unidad: z.string().trim().min(1),
  expediente: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Serie must be a number",
    })
    .refine((val) => Number(val) > 0, {
      message: "Serie must be greater than 0",
    }),
  serie: z.string(),
  documentoOrigen: z.enum(documentTypeEnum, {message: ''}),
});

export type BasicInformationFormValues = z.infer<typeof BasicInformationSchema>;
