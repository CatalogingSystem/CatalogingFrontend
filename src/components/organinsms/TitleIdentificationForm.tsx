import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../models/IdentificationModels/Identification.model";
import FormInput from "../atoms/FormInput";

export default function TitleIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();
  return (
    <>
      <FormInput 
        label="Titulo"
        register={register}
        name="title.name"
        error={errors.title?.name}
      />
      <FormInput 
        label="Atribucion"
        register={register}
        name="title.attribution"
        error={errors.title?.attribution}
      />
      <FormInput 
        label="Traduccion"
        register={register}
        name="title.translation"
        error={errors.title?.translation}
      />
    </>
  )
}
