import { useFormContext } from "react-hook-form";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function TransportForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  return (
    <div className="grid grid-cols-2 gap-x-16">
      <div>
        <header className="flex w-full items-center justify-center mb-4">
          <h2 className="font-semibold text-lg">Salida</h2>
        </header>
        <FormInput<TemporalMovement>
          label="Compañia"
          name="departure.company"
          register={register}
          error={errors.departure?.company}
        />
        <FormInput<TemporalMovement>
          label="Ubicación"
          name="departure.location"
          register={register}
          error={errors.departure?.location}
        />
        <FormInput<TemporalMovement>
          label="Fecha"
          name="departure.date"
          type="date"
          register={register}
          error={errors.departure?.date}
        />
        <FormInput<TemporalMovement>
          label="Hora"
          name="departure.time"
          register={register}
          error={errors.departure?.time}
        />
        <FormTextArea<TemporalMovement>
          label="Notas"
          name="departure.notes"
          register={register}
          error={errors.departure?.notes}
        />
      </div>
      <div>
        <header className="flex w-full items-center justify-center mb-4">
          <h2 className="font-semibold text-lg">Retorno</h2>
        </header>
        <FormInput<TemporalMovement>
          label="Compañia"
          name="return.company"
          register={register}
          error={errors.return?.company}
        />
        <FormInput<TemporalMovement>
          label="Ubicación"
          name="return.location"
          register={register}
          error={errors.return?.location}
        />
        <FormInput<TemporalMovement>
          label="Fecha"
          name="return.date"
          type="date"
          register={register}
          error={errors.return?.date}
        />
        <FormInput<TemporalMovement>
          label="Hora"
          name="return.time"
          register={register}
          error={errors.return?.time}
        />
        <FormTextArea<TemporalMovement>
          label="Notas"
          name="return.notes"
          register={register}
          error={errors.return?.notes}
        />
      </div>
    </div>
  );
}
