import { useFormContext } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import type { AdminFileFormValues } from "../../models/AdministrativeFileModels/AdminFileForm.model";
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
      setValue("dates.finalDate", today, { shouldValidate: true });
    }
  }, [isSubmitted, setValue]);

  return (
    <>
      <FormInput<AdminFileFormValues>
        label="Fecha inicial"
        type="date"
        name="dates.initialDate"
        register={register}
        error={errors.dates?.initialDate}
      />
      <FormInput<AdminFileFormValues>
        label="Fecha final"
        type="date"
        name="dates.finalDate"
        register={register}
        error={errors.dates?.finalDate}
      />
    </>
  );
}
