import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  AdminFileSchema,
  type AdminFileFormValues,
} from "../../models/AdministrativeFileModels/AdminFileForm.model";
import {
  getAdministrativeFile,
  postAdministrativeFile,
  putAdministrativeFile,
} from "../../utils/connections";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminFileTabs } from "../../constants/AdminFileTabs";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useParams } from "react-router-dom";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";
import TabForm from "./TabForm";
import { useCallback, useEffect } from "react";
import { useAuthStore } from "../../Zustand/stores/AuthStore";

export default function AdminFileFormPage() {
  const { tenantId, record } = useParams();
  const {jwt} = useAuthStore()
  const { isEditMode, setEditMode } = useFormStore();

  const methods = useForm<AdminFileFormValues>({
    resolver: zodResolver(
      AdminFileSchema
    ) as unknown as Resolver<AdminFileFormValues>,
    mode: "onBlur",
  });

  const fetchData = useCallback(async () => {
    if (Boolean(record) === false) return;

    setEditMode(Boolean(record), Number(record));
    const data = await getAdministrativeFile(Number(record), tenantId || "", jwt);
    const formattedData = {
      ...data,
      expediente: data.expediente.toString(),
      fechaInicial:
        data.fechaInicial &&
        new Date(data.fechaInicial).toISOString().split("T")[0],
    };
    methods.reset(formattedData);
  }, [jwt, methods, record, setEditMode, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, methods]);

  const { nextStep } = useFormStore();
  const { initializeFormValues } = useFormValuesStore();

  const handleFormSubmit = async (data: AdminFileFormValues) => {
    if (isEditMode)
      await putAdministrativeFile(data, tenantId || "", Number(record), jwt);
    else {
      await postAdministrativeFile(data, tenantId || "", jwt);
    }
    initializeFormValues("administrativeFile", data);
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
