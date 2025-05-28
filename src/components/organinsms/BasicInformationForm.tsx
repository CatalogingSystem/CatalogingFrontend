import { useFormContext } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import FormSelect from "../atoms/FormSelect";
import {
  documentTypeEnum,
  institutionEnum,
} from "../../models/AdministrativeFileModels/BasicInformation.model";
import type { AdminFileFormValues } from "../../models/AdministrativeFileModels/AdminFileForm.model";
import { useFormValuesStore } from "../../Zustand/stores/FormValueStore";

export default function BasicInformationForm() {

  const {
    register,
    formState: { errors },
  } = useFormContext<AdminFileFormValues>();

  return (
    <>
      <FormSelect<AdminFileFormValues>
        label="Institucion"
        register={register}
        name="basicInfo.institucion"
        error={errors.basicInfo?.institucion}
        options={institutionEnum.slice()}
        defaultValue="Selecciona una institucion"
      />
      <FormInput<AdminFileFormValues>
        label="Unidad"
        placeholder="Nombre de la unidad que guarda el objeto"
        name="basicInfo.unidad"
        register={register}
        error={errors.basicInfo?.unidad}
      />
      <FormInput<AdminFileFormValues>
        label="Expediente"
        placeholder="Numero especifico actual"
        type="number"
        name="basicInfo.expediente"
        register={register}
        error={errors.basicInfo?.expediente}
      />
      <FormInput<AdminFileFormValues>
        label="Serie"
        placeholder="Serie documental al que pertenece el objeto"
        name="basicInfo.serie"
        register={register}
        error={errors.basicInfo?.serie}
      />
      <FormSelect<AdminFileFormValues>
        label="Documento origen"
        register={register}
        name="basicInfo.documentoOrigen"
        error={errors.basicInfo?.documentoOrigen}
        options={documentTypeEnum.slice()}
        defaultValue="Selecciona el origen del documento"
      />
    </>
  );
}
