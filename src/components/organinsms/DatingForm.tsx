import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  DatingSchema,
  type DatingFormValues,
} from "../../models/DatingModels/Dating.model";
import { zodResolver } from "@hookform/resolvers/zod";
import TabForm from "./TabForm";
import { datingTabs } from "../../constants/DatingTabs";
import { useNavigate, useParams } from "react-router-dom";
import { getDating, postDating, putDating } from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { useCallback, useEffect, useState } from "react";

export default function DatingForm() {
  const { tenantId, record } = useParams();
  const navigate = useNavigate();
  const { jwt } = useAuthStore();
  const [isEditMode, setIsEditMode] = useState(Boolean(record));

  const methods = useForm<DatingFormValues>({
    resolver: zodResolver(
      DatingSchema
    ) as unknown as Resolver<DatingFormValues>,
    mode: "onBlur",
  });

  const fetchData = useCallback(async () => {
    try {
      if (!isEditMode || !record || !tenantId || !jwt) return;
      const data = await getDating(Number(record), tenantId, jwt);
      const formattedData = {
        ...data,
        expediente: data.expediente.toString(),
        simpleDate: {
          ...data.simpleDate,
          bc: data.simpleDate?.bc?.toString(),
          year: data.simpleDate?.year?.toString(),
          month: data.simpleDate?.month?.toString(),
          day: data.simpleDate?.day?.toString(),
        },
        dateRange: {
          from: {
            ...data.dateRange?.from,
            bc: data.dateRange?.from?.bc?.toString(),
            year: data.dateRange?.from?.year?.toString(),
            month: data.dateRange?.from?.month?.toString(),
            day: data.dateRange?.from?.day?.toString(),
          },
          to: {
            ...data.dateRange?.to,
            bc: data.dateRange?.to?.bc?.toString(),
            year: data.dateRange?.to?.year?.toString(),
            month: data.dateRange?.to?.month?.toString(),
            day: data.dateRange?.to?.day?.toString(),
          },
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

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!jwt || !tenantId) return;

    if (isEditMode) {
      await putDating(data, Number(record), jwt, tenantId);
    } else {
      await postDating(data, jwt, tenantId);
    }
    navigate(-1);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <TabForm items={datingTabs} />
      </form>
    </FormProvider>
  );
}
