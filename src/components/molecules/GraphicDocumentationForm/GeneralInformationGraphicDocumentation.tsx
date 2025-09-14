import { useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../../models/GraphicDocumentation/GraphicDocumentation.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";
import { useFormValuesStore } from "../../../Zustand/stores/FormValueStore";
import SimpleInput from "../../atoms/SimpleFieldInput";

export default function GeneralInformationGraphicDocumentationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ImageRecordFormValues>();

  const { getValue } = useFormValuesStore();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormInput<ImageRecordFormValues>
          label="Expediente"
          name="expediente"
          type="number"
          value={getValue("administrativeFile", "expediente")}
          readOnly={true}
          register={register}
          error={errors.expediente}
        />
        <SimpleInput
          label="Inventario"
          type="number"
          readOnly={true}
          value={getValue("identification", "inventory")}
        />
      </div>
      <FormTextArea<ImageRecordFormValues>
        label="Descripcion"
        placeholder="Datos ampliados relativos al registro de imagen"
        name="description"
        register={register}
        error={errors.description}
      />
      <FormTextArea<ImageRecordFormValues>
        label="Datos Tecnicos"
        placeholder="Datos del registro y equipos utilizados"
        name="technicalData"
        register={register}
        error={errors.technicalData}
      />
    </>
  );
}
