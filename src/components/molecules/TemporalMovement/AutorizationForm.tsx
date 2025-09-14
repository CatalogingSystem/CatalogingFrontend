import { useFormContext } from "react-hook-form";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormInput from "../../atoms/FormInput";

export default function AutorizationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  return (
    <>
      <FormInput<TemporalMovement>
        label="Documento"
        name="document"
        register={register}
        error={errors.document}
      />
      <FormInput<TemporalMovement>
        label="Codigo"
        name="code"
        register={register}
        error={errors.code}
      />
      <FormInput<TemporalMovement>
        label="Fecha de Emision"
        name="date"
        type="date"
        register={register}
        error={errors.date}
      />
    </>
  );
}
