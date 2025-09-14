import { useFormContext } from "react-hook-form";
import type { Conservation } from "../../../models/Conservation/Conservation.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function TreatmentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Conservation>();

  return (
    <>
      <FormInput<Conservation>
        label="Tipo de tratamiento"
        name="treatmentType"
        register={register}
        error={errors.treatmentType}
      />
      <FormInput<Conservation>
        label="Condiciones especiales"
        name="specialConditions"
        register={register}
        error={errors.specialConditions}
      />
      <FormTextArea<Conservation>
        label="Descripción"
        name="description"
        register={register}
        error={errors.description}
      />
      <FormTextArea<Conservation>
        label="Observaciones"
        name="observations"
        register={register}
        error={errors.observations}
      />
    </>
  );
}
