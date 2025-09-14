import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../../models/IdentificationModels/Identification.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function TechniqueIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();
  return (
    <>
      <FormInput
        label="Tecnica"
        register={register}
        name="techniques.techniqueName"
        error={errors.techniques?.techniqueName}
      />
      <FormTextArea
        label="Parte Descrita"
        register={register}
        name="techniques.describedPart"
        error={errors.techniques?.describedPart}
      />
    </>
  );
}
