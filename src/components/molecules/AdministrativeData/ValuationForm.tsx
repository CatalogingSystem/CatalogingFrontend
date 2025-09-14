import { useFormContext } from "react-hook-form";
import type { AdministrativeData } from "../../../models/AdministrativeData/AdministrativeData.model";
import FormInput from "../../atoms/FormInput";

export default function ValuationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdministrativeData>();

  return (
    <>
      <FormInput<AdministrativeData>
        label="Valoración"
        name="valuation.value"
        register={register}
        error={errors.valuation?.value}
      />
      <FormInput<AdministrativeData>
        label="Tasador"
        name="valuation.appraiser"
        register={register}
        error={errors.valuation?.appraiser}
      />
      <FormInput<AdministrativeData>
        label="Fecha"
        name="valuation.date"
        type="date"
        register={register}
        error={errors.valuation?.date}
      />
      <FormInput<AdministrativeData>
        label="Notas"
        name="valuation.notes"
        register={register}
        error={errors.valuation?.notes}
      />
    </>
  );
}
