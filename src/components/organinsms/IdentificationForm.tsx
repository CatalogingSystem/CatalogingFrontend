import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IdentificationSchema,
  type IdentificationFormValues,
} from "../../models/IdentificationModels/Identification.model";
import { postIdentification } from "../../utils/connections";
import { identificationTabs } from "../../constants/IdentificationTabs";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useParams } from "react-router-dom";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";
import TabForm from "./TabForm";

export default function IdentificationForm() {
  const { tenantId } = useParams();
  const { nextStep } = useFormStore();
  const { setValue } = useFormValuesStore();

  const methods = useForm<IdentificationFormValues>({
    resolver: zodResolver(
      IdentificationSchema
    ) as unknown as Resolver<IdentificationFormValues>,
    mode: "onBlur",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    console.log("Formulario completo enviado:", data);
    setValue("inventory", data.inventory);
    await postIdentification(data, tenantId || "");
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
