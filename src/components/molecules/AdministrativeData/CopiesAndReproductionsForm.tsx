import { useFormContext } from "react-hook-form";
import type { AdministrativeData } from "../../../models/AdministrativeData/AdministrativeData.model";
import FormInput from "../../atoms/FormInput";

export default function CopiesAndReproductionsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdministrativeData>();

  return (
    <>
      <FormInput<AdministrativeData>
        label="Autor"
        name="copiesReproductions.author"
        register={register}
        error={errors.copiesReproductions?.author}
      />
      <FormInput<AdministrativeData>
        label="Título original"
        name="copiesReproductions.originalTitle"
        register={register}
        error={errors.copiesReproductions?.originalTitle}
      />
      <FormInput<AdministrativeData>
        label="Método"
        name="copiesReproductions.method"
        register={register}
        error={errors.copiesReproductions?.method}
      />
      <FormInput<AdministrativeData>
        label="Formato"
        name="copiesReproductions.format"
        register={register}
        error={errors.copiesReproductions?.format}
      />
      <FormInput<AdministrativeData>
        label="Destino original"
        name="copiesReproductions.originalDestination"
        register={register}
        error={errors.copiesReproductions?.originalDestination}
      />
      <FormInput<AdministrativeData>
        label="Ubicación"
        name="copiesReproductions.location"
        register={register}
        error={errors.copiesReproductions?.location}
      />
      <FormInput<AdministrativeData>
        label="Fecha"
        name="copiesReproductions.date"
        type="date"
        register={register}
        error={errors.copiesReproductions?.date}
      />
      <FormInput<AdministrativeData>
        label="Notas"
        name="copiesReproductions.notes"
        register={register}
        error={errors.copiesReproductions?.notes}
      />
    </>
  );
}
