import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  AdministrativeDataSchema,
  type AdministrativeData,
} from "../../models/AdministrativeData/AdministrativeData.model";
import TabForm from "./TabForm";
import { administrativeDataTabs } from "../../constants/AdministrativeDataTabs";
import { useParams } from "react-router-dom";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useCallback, useEffect, useState } from "react";
import {
  getAdministrativeData,
  postAdministrativeData,
  putAdministrativeData,
} from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";

export default function AdministrativeDataForm() {
  const { record, tenantId } = useParams();
  const { jwt } = useAuthStore();
  const { nextStep } = useFormStore();
  const [isEditMode, setIsEditMode] = useState(Boolean(record));

  const methods = useForm<AdministrativeData>({
    mode: "onBlur",
    resolver: zodResolver(
      AdministrativeDataSchema
    ) as unknown as Resolver<AdministrativeData>,
  });

  const fetchData = useCallback(async () => {
    try {
      setIsEditMode(Boolean(record));
      if (!isEditMode || !record || !tenantId) return;
      const data = await getAdministrativeData(Number(record), tenantId, jwt);
      const formattedData: AdministrativeData = {
        ...data,
        fileNumber: String(data.fileNumber),
        entryDate: data.entryDate
          ? new Date(data.entryDate).toISOString().split("T")[0]
          : null,
        catalogingDate: data.catalogingDate
          ? new Date(data.catalogingDate).toISOString().split("T")[0]
          : null,
        copiesReproductions: {
          ...data.copiesReproductions,
          date: data.copiesReproductions.date
            ? new Date(data.copiesReproductions.date)
                .toISOString()
                .split("T")[0]
            : null,
        },
        valuation: {
          ...data.valuation,
          date: data.valuation.date
            ? new Date(data.valuation.date).toISOString().split("T")[0]
            : null,
        },
      };
      methods.reset(formattedData);
    } catch {
      setIsEditMode(false);
    }
  }, [isEditMode, jwt, methods, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = async (data: AdministrativeData) => {
    if (!tenantId || !jwt) return;

    if (isEditMode) {
      await putAdministrativeData(data, Number(record), tenantId, jwt);
    } else {
      await postAdministrativeData(data, tenantId, jwt);
    }
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TabForm items={administrativeDataTabs} />
      </form>
    </FormProvider>
  );
}
