import { useFormContext } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import FormToggle from "../atoms/FormToggle";
import FormTextArea from "../atoms/FormTextArea";
import type { AdminFileFormValues } from "../../models/AdministrativeFileModels/AdminFileForm.model";

export default function AdditionalDetailsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdminFileFormValues>();

  return (
    <>
      <FormInput
        label="Expediente Anterior"
        placeholder="Expediente generado anteriormente"
        type="number"
        name="additional.expedienteAnterior"
        register={register}
        error={errors.additional?.expedienteAnterior}
      />
      <FormInput
        label="Asunto"
        placeholder="Descripcion especifica de las causas"
        name="additional.asunto"
        register={register}
        error={errors.additional?.asunto}
      />
      <FormToggle
        label="Peticion de transferencia"
        name="additional.peticionTransferencia"
        register={register}
        error={errors.additional?.peticionTransferencia}
        activeText="Si"
        inactiveText="No"
      />
      <FormTextArea
        label="Historial"
        placeholder="Historia textual y cronologica de la documentacion"
        name="additional.historial"
        register={register}
        error={errors.additional?.historial}
      />
      <FormInput
        label="Archivo Documental"
        placeholder="Pertenencia precisa a archivo de expedientes"
        name="additional.archivoDocumental"
        register={register}
        error={errors.additional?.archivoDocumental}
      />
      <FormTextArea
        label="Observaciones"
        placeholder="Informaciones ampliatorias"
        name="additional.observaciones"
        register={register}
        error={errors.additional?.observaciones}
      />
    </>
  );
}
