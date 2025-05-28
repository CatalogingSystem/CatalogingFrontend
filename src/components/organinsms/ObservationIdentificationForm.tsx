import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../models/IdentificationModels/Identification.model";
import FormTextArea from "../atoms/FormTextArea";

export default function ObservationIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();
  return (
    <>
      <FormTextArea
        label="Observaciones Generales"
        register={register}
        name="observations"
        error={errors.observations}
      />
    </>
  );
}
