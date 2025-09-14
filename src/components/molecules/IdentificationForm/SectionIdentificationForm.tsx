import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../../models/IdentificationModels/Identification.model";
import FormInput from "../../atoms/FormInput";

export default function SectionIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Sala"
          register={register}
          name="section.room"
          error={errors.section?.room}
        />
        <FormInput<IdentificationFormValues>
          label="Panel"
          register={register}
          name="section.panel"
          error={errors.section?.panel}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Vitrina"
          register={register}
          name="section.displayCase"
          error={errors.section?.displayCase}
        />
        <FormInput<IdentificationFormValues>
          label="Caballete"
          register={register}
          name="section.easel"
          error={errors.section?.easel}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Deposito"
          register={register}
          name="section.storage"
          error={errors.section?.storage}
        />
        <FormInput<IdentificationFormValues>
          label="Patio"
          register={register}
          name="section.courtyarb"
          error={errors.section?.courtyarb}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<IdentificationFormValues>
          label="Pilar"
          register={register}
          name="section.pillar"
          error={errors.section?.pillar}
        />
        <FormInput<IdentificationFormValues>
          label="Otros"
          register={register}
          name="section.others"
          error={errors.section?.others}
        />
      </div>
    </>
  );
}
