import { useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../../models/GraphicDocumentation/GraphicDocumentation.model";
import FormTextArea from "../../atoms/FormTextArea";

export default function ObservationGraphicDocumentationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ImageRecordFormValues>();

  return (
    <>
      <FormTextArea
        label="Observaciones Generales"
        placeholder="Datos no consignados y considerados relevantes."
        name="generalObservations"
        register={register}
        error={errors.generalObservations}
      />
    </>
  );
}
