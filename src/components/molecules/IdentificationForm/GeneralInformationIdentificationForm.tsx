import { useFormContext } from "react-hook-form";
import type { IdentificationFormValues } from "../../../models/IdentificationModels/Identification.model";
import FormInput from "../../atoms/FormInput";
import { useFormValuesStore } from "../../../Zustand/stores/FormValueStore";

export default function GeneralInformationIdentificationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IdentificationFormValues>();

  const { getValue } = useFormValuesStore();

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <FormInput<IdentificationFormValues>
          label="Expediente"
          register={register}
          name="expediente"
          value={getValue("administrativeFile", "expediente")}
          readOnly={true}
          error={errors.expediente}
          type="number"
        />
        <FormInput<IdentificationFormValues>
          label="Inventario"
          placeholder="Numero de inventario del objeto"
          register={register}
          name="inventory"
          error={errors.inventory}
          type="number"
        />
        <FormInput<IdentificationFormValues>
          label="Numero de Objetos"
          placeholder="Numero de objetos"
          register={register}
          name="numberOfObjects"
          error={errors.numberOfObjects}
          type="number"
        />
      </div>
      <FormInput<IdentificationFormValues>
        label="Clasificaion Generica"
        placeholder="Clasificacion Generica que corresponde el objeto"
        register={register}
        name="genericClassification"
        error={errors.genericClassification}
      />
      <FormInput<IdentificationFormValues>
        label="Nombre del objeto"
        placeholder="Nombre con que se designa el objeto"
        register={register}
        name="objectName"
        error={errors.objectName}
      />
    </>
  );
}
