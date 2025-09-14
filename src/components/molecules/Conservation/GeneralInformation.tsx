import { useFormContext } from "react-hook-form";
import type { Conservation } from "../../../models/Conservation/Conservation.model";
import FormInput from "../../atoms/FormInput";
import { useFormValuesStore } from "../../../Zustand/stores/FormValueStore";
import SimpleInput from "../../atoms/SimpleFieldInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function GeneralInformation() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Conservation>();

  const { getValue } = useFormValuesStore();

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput<Conservation>
          label="Expediente"
          name="expediente"
          register={register}
          value={getValue("administrativeFile", "expediente")}
          error={errors.expediente}
          readOnly
        />
        <SimpleInput
          label="Inventario"
          value={getValue("identification", "inventory")}
          readOnly
        />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput<Conservation>
          label="Área afectada"
          name="affectedArea"
          register={register}
          error={errors.affectedArea}
        />
        <FormInput<Conservation>
          label="Longitud"
          name="length"
          register={register}
          error={errors.length}
        />
        <FormInput<Conservation>
          label="Ancho"
          name="width"
          register={register}
          error={errors.width}
        />
        <FormInput<Conservation>
          label="Profundidad"
          name="depth"
          register={register}
          error={errors.depth}
        />
      </div>
      <FormInput<Conservation>
        label="Tipos de análisis"
        name="analysisTypes"
        register={register}
        error={errors.analysisTypes}
      />
      <FormTextArea<Conservation>
        label="Informes"
        name="reports"
        register={register}
        error={errors.reports}
      />
      <FormTextArea<Conservation>
        label="Notas"
        name="notes"
        register={register}
        error={errors.notes}
      />
      <FormTextArea<Conservation>
        label="Resultados"
        name="results"
        register={register}
        error={errors.results}
      />
    </>
  );
}
