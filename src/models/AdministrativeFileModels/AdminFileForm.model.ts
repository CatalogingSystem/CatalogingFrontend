import { z } from "zod";
import { AdditionalInformationSchema } from "./AditionalInformation.model";
import { BasicInformationSchema } from "./BasicInformation.model";
import { DatesSchema } from "./Dates.model";

export const AdminFileSchema = z.object({
  basicInfo: BasicInformationSchema,
  dates: DatesSchema,
  additional: AdditionalInformationSchema,
});

export type AdminFileFormValues = z.infer<typeof AdminFileSchema>;
