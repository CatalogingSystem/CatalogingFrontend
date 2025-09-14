import { useFormContext } from "react-hook-form";
import type { AdminFileFormValues } from "../../../models/AdministrativeFileModels/AdminFileForm.model";
import FormSelect from "../../atoms/FormSelect";
import {
  documentTypeEnum,
  institutionEnum,
} from "../../../models/AdministrativeFileModels/BasicInformation.model";
import FormInput from "../../atoms/FormInput";
import { useFormStore } from "../../../Zustand/stores/FormStore";

export default function BasicInformationForm() {
  const { isEditMode } = useFormStore();

  const {
    register,
    formState: { errors },
  } = useFormContext<AdminFileFormValues>();

  return (
    <>
      <FormSelect<AdminFileFormValues>
        label="Institucion"
        register={register}
        name="institucion"
        error={errors.institucion}
        options={institutionEnum.slice()}
        defaultValue="Selecciona una institucion"
      />
      <FormInput<AdminFileFormValues>
        label="Unidad"
        placeholder="Nombre de la unidad que guarda el objeto"
        name="unidad"
        register={register}
        error={errors.unidad}
      />
      <FormInput<AdminFileFormValues>
        label="Expediente"
        placeholder="Numero especifico actual"
        readOnly={isEditMode}
        type="number"
        name="expediente"
        register={register}
        error={errors.expediente}
      />
      <FormInput<AdminFileFormValues>
        label="Serie"
        placeholder="Serie documental al que pertenece el objeto"
        name="serie"
        register={register}
        error={errors.serie}
      />
      <FormSelect<AdminFileFormValues>
        label="Documento origen"
        register={register}
        name="documentoOrigen"
        error={errors.documentoOrigen}
        options={documentTypeEnum.slice()}
        defaultValue="Selecciona el origen del documento"
      />
    </>
  );
}
