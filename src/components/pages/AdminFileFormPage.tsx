import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  AdminFileSchema,
  type AdminFileFormValues,
} from "../../models/AdministrativeFileModels/AdminFileForm.model";
import { postAdministrativeFile } from "../../utils/connections";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFileTabs } from "../../constants/AdminFileTabs";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useParams } from "react-router-dom";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";
import TabForm from "../organinsms/TabForm";

export default function AdminFileFormPage() {
  const { tenantId } = useParams();

  const methods = useForm<AdminFileFormValues>({
    resolver: zodResolver(
      AdminFileSchema
    ) as unknown as Resolver<AdminFileFormValues>,
    mode: "onBlur",
  });

  const { nextStep } = useFormStore();
  const { setValue } = useFormValuesStore();

  const handleFormSubmit = async (data: AdminFileFormValues) => {
    console.log("Formulario válido:", data);
    const formattedData = {
      ...data.basicInfo,
      ...data.dates,
      ...data.additional,
    };
    setValue('record', data.basicInfo.expediente)
    await postAdministrativeFile(formattedData, tenantId || "");
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <TabForm items={adminFileTabs} />
      </form>
    </FormProvider>
  );
}
