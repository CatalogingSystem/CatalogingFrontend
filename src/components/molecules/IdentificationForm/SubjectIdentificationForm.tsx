import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../../models/IdentificationModels/Identification.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function MaterialIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();
  return (
    <>
      <FormInput
        label="Materia"
        register={register}
        name="material.materialName"
        error={errors.material?.materialName}
      />
      <FormTextArea
        label="Parte Descrita"
        register={register}
        name="material.describedPart"
        error={errors.material?.describedPart}
      />
      <FormInput
        label="Colores"
        register={register}
        name="material.colors"
        error={errors.material?.colors}
      />
    </>
  );
}
