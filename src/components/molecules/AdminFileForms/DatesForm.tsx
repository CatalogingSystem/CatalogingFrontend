import { useFormContext } from "react-hook-form";
import type { AdminFileFormValues } from "../../../models/AdministrativeFileModels/AdminFileForm.model";
import FormInput from "../../atoms/FormInput";
import { useEffect } from "react";

export default function DatesForm() {
  const {
    register,
    formState: { errors, isSubmitted },
    setValue,
  } = useFormContext<AdminFileFormValues>();

  useEffect(() => {
    if (isSubmitted) {
      const today = new Date().toISOString().split("T")[0];
      setValue("fechaInicial", today, { shouldValidate: true });
    }
  }, [isSubmitted, setValue]);

  return (
    <>
      <FormInput<AdminFileFormValues>
        label="Fecha inicial"
        type="date"
        name="fechaInicial"
        register={register}
        error={errors.fechaInicial}
      />
      <FormInput<AdminFileFormValues>
        label="Fecha final"
        type="date"
        name="fechaFinal"
        register={register}
        error={errors.fechaFinal}
      />
    </>
  );
}
