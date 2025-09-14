import { useFormContext } from "react-hook-form";
import FormInput from "../../atoms/FormInput";
import FormToggle from "../../atoms/FormToggle";
import FormTextArea from "../../atoms/FormTextArea";
import type { AdminFileFormValues } from "../../../models/AdministrativeFileModels/AdminFileForm.model";

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
        name="expedienteAnterior"
        register={register}
        error={errors.expedienteAnterior}
      />
      <FormInput
        label="Asunto"
        placeholder="Descripcion especifica de las causas"
        name="asunto"
        register={register}
        error={errors.asunto}
      />
      <FormToggle
        label="Peticion de transferencia"
        name="peticionTransferencia"
        register={register}
        error={errors.peticionTransferencia}
        activeText="Si"
        inactiveText="No"
      />
      <FormTextArea
        label="Historial"
        placeholder="Historia textual y cronologica de la documentacion"
        name="historial"
        register={register}
        error={errors.historial}
      />
      <FormInput
        label="Archivo Documental"
        placeholder="Pertenencia precisa a archivo de expedientes"
        name="archivoDocumental"
        register={register}
        error={errors.archivoDocumental}
      />
      <FormTextArea
        label="Observaciones"
        placeholder="Informaciones ampliatorias"
        name="observaciones"
        register={register}
        error={errors.observaciones}
      />
    </>
  );
}
