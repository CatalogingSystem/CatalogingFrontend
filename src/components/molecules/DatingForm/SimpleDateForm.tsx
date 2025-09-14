import { useFormContext } from "react-hook-form";
import type { DatingFormValues } from "../../../models/DatingModels/Dating.model";
import { useFormValuesStore } from "../../../Zustand/stores/FormValueStore";
import FormInput from "../../atoms/FormInput";
import SimpleInput from "../../atoms/SimpleFieldInput";

export default function SimpleDateForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DatingFormValues>();

  const { getValue } = useFormValuesStore();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormInput<DatingFormValues>
          label="Expediente"
          name="expediente"
          type="number"
          register={register}
          value={getValue("administrativeFile", "expediente")}
          error={errors.expediente}
          readOnly
        />
        <SimpleInput
          label="Inventario"
          type="text"
          value={getValue("identification", "inventory")}
          readOnly
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormInput<DatingFormValues>
          label="Fecha Exacta"
          name="simpleDate.exact"
          register={register}
          error={errors.simpleDate?.exact}
        />
        <FormInput<DatingFormValues>
          label="Fecha Aproximada"
          name="simpleDate.approximate"
          register={register}
          error={errors.simpleDate?.approximate}
        />
        <FormInput<DatingFormValues>
          label="Fecha Probable"
          name="simpleDate.probable"
          register={register}
          error={errors.simpleDate?.probable}
        />
        <FormInput<DatingFormValues>
          label="Fecha antes de Cristo (AC)"
          name="simpleDate.bc"
          register={register}
          error={errors.simpleDate?.bc}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormInput<DatingFormValues>
          label="Año"
          name="simpleDate.year"
          register={register}
          error={errors.simpleDate?.year}
        />
        <FormInput<DatingFormValues>
          label="Mes"
          name="simpleDate.month"
          register={register}
          error={errors.simpleDate?.month}
        />
        <FormInput<DatingFormValues>
          label="Día"
          name="simpleDate.day"
          register={register}
          error={errors.simpleDate?.day}
        />
      </div>
    </>
  );
}
