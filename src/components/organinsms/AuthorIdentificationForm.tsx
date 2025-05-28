import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../models/IdentificationModels/Identification.model";
import FormInput from "../atoms/FormInput";

export default function AuthorIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();

  return (
    <>
      <FormInput<IdentificationFormValues>
        label="Nombre"
        register={register}
        name="author.name"
        error={errors.author?.name}
      />
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Lugar de Nacimiento"
          register={register}
          name="author.birthPlace"
          error={errors.author?.birthPlace}
        />
        <FormInput<IdentificationFormValues>
          label="Fecha de Nacimiento"
          type="date"
          register={register}
          name="author.birthDate"
          error={errors.author?.birthDate}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Lugar de defuncion"
          register={register}
          name="author.deathPlace"
          error={errors.author?.deathPlace}
        />
        <FormInput<IdentificationFormValues>
          label="Fecha de Defuncion"
          register={register}
          type="date"
          name="author.deathDate"
          error={errors.author?.deathDate}
        />
      </div>
    </>
  );
}
