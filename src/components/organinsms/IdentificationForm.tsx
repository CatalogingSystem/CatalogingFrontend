import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IdentificationSchema,
  type IdentificationFormValues,
} from "../../models/IdentificationModels/Identification.model";
import {
  getIdentification,
  postIdentification,
  putIdentification,
} from "../../utils/connections";
import { identificationTabs } from "../../constants/IdentificationTabs";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useParams } from "react-router-dom";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";
import TabForm from "./TabForm";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../Zustand/stores/AuthStore";

export default function IdentificationForm() {
  const { tenantId, record } = useParams();
  const { jwt } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(Boolean(record));
  const { nextStep } = useFormStore();
  const { initializeFormValues } = useFormValuesStore();

  const methods = useForm<IdentificationFormValues>({
    resolver: zodResolver(
      IdentificationSchema
    ) as unknown as Resolver<IdentificationFormValues>,
    mode: "onBlur",
  });

  const fetchData = useCallback(async () => {
    try {
      if (isEditMode) {
        const data = await getIdentification(
          Number(record),
          tenantId || "",
          jwt
        );

        const formattedData = {
          ...data,
          expediente: data.expediente.toString(),
          inventory: data.inventory.toString(),
          numberOfObjects: data.numberOfObjects.toString(),
          author: {
            ...data.author,
            birthDate: data.author.birthDate
              ? new Date(data.author.birthDate).toISOString().split("T")[0]
              : "",
            deathDate: data.author.deathDate
              ? new Date(data.author.deathDate).toISOString().split("T")[0]
              : "",
          },
        };
        methods.reset(formattedData);
      }
    } catch {
      setIsEditMode(false);
    }
  }, [isEditMode, jwt, methods, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (isEditMode) {
      await putIdentification(data, tenantId || "", Number(record), jwt);
    } else {
      await postIdentification(data, tenantId || "", jwt);
    }
    initializeFormValues("identification", data);
    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TabForm items={identificationTabs} />
      </form>
    </FormProvider>
  );
}
