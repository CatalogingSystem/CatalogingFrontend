import { useFormContext } from "react-hook-form";
import type { DatingFormValues } from "../../../models/DatingModels/Dating.model";
import FormInput from "../../atoms/FormInput";

export default function DateRangeForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DatingFormValues>();

  return (
    <div className="grid grid-cols-2 gap-24">
      <section>
        <h2 className="text-lg font-semibold">Desde:</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormInput<DatingFormValues>
            label="Fecha Exacta"
            name="dateRange.from.exact"
            register={register}
            error={errors.dateRange?.from?.exact}
          />
          <FormInput<DatingFormValues>
            label="Fecha Aproximada"
            name="dateRange.from.approximate"
            register={register}
            error={errors.dateRange?.from?.approximate}
          />
          <FormInput<DatingFormValues>
            label="Fecha Probable"
            name="dateRange.from.probable"
            register={register}
            error={errors.dateRange?.from?.probable}
          />
          <FormInput<DatingFormValues>
            label="Fecha antes de Cristo (AC)"
            name="dateRange.from.bc"
            register={register}
            error={errors.dateRange?.from?.bc}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormInput<DatingFormValues>
            label="Año"
            name="dateRange.from.year"
            register={register}
            error={errors.dateRange?.from?.year}
          />
          <FormInput<DatingFormValues>
            label="Mes"
            name="dateRange.from.month"
            register={register}
            error={errors.dateRange?.from?.month}
          />
          <FormInput<DatingFormValues>
            label="Día"
            name="dateRange.from.day"
            register={register}
            error={errors.dateRange?.from?.day}
          />
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold">Hasta:</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <FormInput<DatingFormValues>
            label="Fecha Exacta"
            name="dateRange.to.exact"
            register={register}
            error={errors.dateRange?.to?.exact}
          />
          <FormInput<DatingFormValues>
            label="Fecha Aproximada"
            name="dateRange.to.approximate"
            register={register}
            error={errors.dateRange?.to?.approximate}
          />
          <FormInput<DatingFormValues>
            label="Fecha Probable"
            name="dateRange.to.probable"
            register={register}
            error={errors.dateRange?.to?.probable}
          />
          <FormInput<DatingFormValues>
            label="Fecha antes de Cristo (AC)"
            name="dateRange.to.bc"
            register={register}
            error={errors.dateRange?.to?.bc}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <FormInput<DatingFormValues>
            label="Año"
            name="dateRange.to.year"
            register={register}
            error={errors.dateRange?.to?.year}
          />
          <FormInput<DatingFormValues>
            label="Mes"
            name="dateRange.to.month"
            register={register}
            error={errors.dateRange?.to?.month}
          />
          <FormInput<DatingFormValues>
            label="Día"
            name="dateRange.to.day"
            register={register}
            error={errors.dateRange?.to?.day}
          />
        </div>
      </section>
    </div>
  );
}
