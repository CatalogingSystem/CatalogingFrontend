import { useFormContext } from "react-hook-form";
import FormInput from "../../atoms/FormInput";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormSelect from "../../atoms/FormSelect";
import { useParams } from "react-router-dom";
import FormTextArea from "../../atoms/FormTextArea";

export default function GeneralInformationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  const { record } = useParams();

  const MovementTypes = [
    "Restoration",
    "Conservation",
    "InternalTemporaryExhibition",
    "ExternalTemporaryExhibition",
    "LaboratoryAnalysis",
    "PhotographicRecord",
    "Studies",
    "PermanentExhibitionSiteChange",
    "Relocation",
    "Loan",
    "Disposal",
  ];

  return (
    <>
      <FormInput<TemporalMovement>
        label="Expediente"
        name="expediente"
        register={register}
        error={errors.expediente}
        value={record}
        type="number"
        readOnly
      />
      <FormSelect<TemporalMovement>
        label="Tipo de Movimiento"
        name="movementType"
        register={register}
        error={errors.movementType}
        options={MovementTypes}
      />
      <FormInput<TemporalMovement>
        label="Ubicación de Transferencia"
        name="transferLocation"
        register={register}
        error={errors.transferLocation}
      />
      <FormInput<TemporalMovement>
        label="Entidad"
        name="entity"
        register={register}
        error={errors.entity}
      />
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput<TemporalMovement>
          label="Fecha de Transferencia"
          name="departureDate"
          type="date"
          register={register}
          error={errors.departureDate}
        />
        <FormInput<TemporalMovement>
          label="Fecha de Retorno"
          name="returnDate"
          type="date"
          register={register}
          error={errors.returnDate}
        />
      </div>
      <FormTextArea<TemporalMovement>
        label="Observaciones"
        name="observations"
        register={register}
        error={errors.observations}
      />
    </>
  );
}
