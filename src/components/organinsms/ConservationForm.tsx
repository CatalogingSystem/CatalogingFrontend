import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import TabForm from "./TabForm";
import { conservationTabs } from "../../constants/ConservationTabs";
import {
  ConservationSchema,
  type Conservation,
} from "../../models/Conservation/Conservation.model";
import { useCallback, useEffect, useState } from "react";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import {
  getConservation,
  postConservation,
  putConservation,
} from "../../utils/connections";

export default function ConservationForm() {
  const { record, tenantId } = useParams();
  const { nextStep } = useFormStore();
  const [isEditMode, setIsEditMode] = useState(Boolean(record));
  const { jwt } = useAuthStore();

  const methods = useForm<Conservation>({
    mode: "onBlur",
    resolver: zodResolver(
      ConservationSchema
    ) as unknown as Resolver<Conservation>,
  });

  const fetchData = useCallback(async () => {
    if (!record || !tenantId || !jwt) return;
    try {
      setIsEditMode(Boolean(record));
      const data = await getConservation(Number(record), tenantId, jwt);
      const formattedData: Conservation = {
        ...data,
        expediente: String(data.expediente),
      };
      methods.reset(formattedData);
    } catch {
      setIsEditMode(false);
    }
  }, [jwt, methods, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onSubmit = methods.handleSubmit(async (data: Conservation) => {
    if (!record || !tenantId || !jwt) return;

    if (isEditMode) {
      await putConservation(data, tenantId, Number(record), jwt);
    } else {
      await postConservation(data, tenantId, jwt);
    }
    nextStep();
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TabForm items={conservationTabs} />
      </form>
    </FormProvider>
  );
}
