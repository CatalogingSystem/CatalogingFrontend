import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../models/IdentificationModels/Identification.model";
import FormInput from "../atoms/FormInput";
import FormTextArea from "../atoms/FormTextArea";

export default function SpecificNameIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();

  return (
    <>
        <FormInput<IdentificationFormValues>
          label="Nombre Generico"
          register={register}
          name="specificName.genericName"
          error={errors.specificName?.genericName}
        />
        <FormTextArea<IdentificationFormValues>
          label="Terminos Relacionados"
          register={register}
          name="specificName.relatedTerms"
          error={errors.specificName?.relatedTerms}
        />
        <FormTextArea<IdentificationFormValues>
          label="Terminos Especificos"
          register={register}
          name="specificName.specificTerms"
          error={errors.specificName?.specificTerms}
        />
        <FormInput<IdentificationFormValues>
          label="Usado Por"
          register={register}
          name="specificName.usedBy"
          error={errors.specificName?.usedBy}
        />
        <FormTextArea<IdentificationFormValues>
          label="Notas"
          register={register}
          name="specificName.notes"
          error={errors.specificName?.notes}
        />
    </>
  );
}
