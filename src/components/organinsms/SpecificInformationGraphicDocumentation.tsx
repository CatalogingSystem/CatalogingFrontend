import { useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../models/GraphicDocumentation/GraphicDocumentation.model";
import FormInput from "../atoms/FormInput";

export default function SpecificInformationGraphicDocumentationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ImageRecordFormValues>();

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <FormInput
          label="Numero Generico"
          name="genericControlNumber"
          type="number"
          register={register}
          error={errors.genericControlNumber}
        />
        <FormInput
          label="Numero Especifico"
          name="specificControlNumber"
          type="number"
          register={register}
          error={errors.specificControlNumber}
        />
        <FormInput
          label="Fecha"
          name="date"
          type="date"
          register={register}
          error={errors.date}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Ancho"
          name="dimensions.width"
          type="number"
          register={register}
          error={errors.dimensions?.width}
        />
        <FormInput
          label="Alto"
          name="dimensions.height"
          type="number"
          register={register}
          error={errors.dimensions?.height}
        />
      </div>
    </>
  );
}
