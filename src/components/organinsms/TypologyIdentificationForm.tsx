import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../models/IdentificationModels/Identification.model";
import FormInput from "../atoms/FormInput";

export default function TypologyIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Tipo"
          register={register}
          name="typology.type"
          error={errors.typology?.type}
        />
        <FormInput<IdentificationFormValues>
          label="Subtipo"
          register={register}
          name="typology.subtype"
          error={errors.typology?.subtype}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Clase"
          register={register}
          name="typology.class"
          error={errors.typology?.class}
        />
        <FormInput<IdentificationFormValues>
          label="Subclase"
          register={register}
          name="typology.subclass"
          error={errors.typology?.subclass}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Orden"
          register={register}
          name="typology.order"
          error={errors.typology?.order}
        />
        <FormInput<IdentificationFormValues>
          label="Suborden"
          register={register}
          name="typology.suborder"
          error={errors.typology?.suborder}
        />
      </div>
    </>
  );
}
