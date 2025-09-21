import { z } from "zod";

const todayUTC = new Date().toISOString().split("T")[0];

export const institutionEnum = [
  "U.M.R.P.S.F.X.CH",
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

export const AdminFileSchema = z
  .object({
    institucion: z.enum(institutionEnum, {
      message: "Seleccione una institución",
    }),
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
    documentoOrigen: z.enum(documentTypeEnum, {
      message: "Seleccione un tipo de documento",
    }),
    fechaInicial: z.preprocess(
      (val) => {
        const input =
          typeof val === "string" && val !== ""
            ? new Date(val)
            : new Date(todayUTC);
        return input.toISOString();
      },
      z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "La fecha inicial debe ser válida",
        })
        .refine((val) => new Date(val) <= new Date(), {
          message: "La fecha inicial no puede estar en el futuro",
        })
    ),
    fechaFinal: z.preprocess(
      (val) => {
        const trimmed = typeof val === "string" ? val.trim() : "";
        if (trimmed === "") return null;
        const date = new Date(trimmed);
        return isNaN(date.getTime()) ? null : date.toISOString();
      },
      z
        .string()
        .nullable()
        .refine((val) => val === null || !isNaN(Date.parse(val)), {
          message: "La fecha final debe ser válida",
        })
    ),
    expedienteAnterior: z
      .string()
      .refine((val) => val === undefined || val === "" || !isNaN(Number(val)), {
        message: "El expediente anterior debe ser un número",
      })
      .refine((val) => val === undefined || val === "" || Number(val) > 0, {
        message: "El expediente anterior debe ser mayor a 0",
      })
      .optional()
      .nullable(),
    asunto: z.string().optional().nullable(),
    peticionTransferencia: z.boolean().default(false),
    historial: z.string().optional().nullable(),
    archivoDocumental: z.string().optional().nullable(),
    observaciones: z.string().optional().nullable(),
  })
  .refine(
    (data) =>
      !data.fechaFinal ||
      new Date(data.fechaFinal) > new Date(data.fechaInicial),
    {
      message: "La fecha final debe ser posterior a la fecha inicial",
      path: ["fechaFinal"],
    }
  );

export type AdminFileFormValues = z.infer<typeof AdminFileSchema>;
