import { useFormContext } from "react-hook-form";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function InsuranceForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  return (
    <>
      <FormInput<TemporalMovement>
        label="Aseguradora"
        name="insurer"
        register={register}
        error={errors.insurer}
      />
      <FormInput<TemporalMovement>
        label="Poliza"
        name="policy"
        register={register}
        error={errors.policy}
      />
      <FormTextArea<TemporalMovement>
        label="Notas"
        name="notes"
        register={register}
        error={errors.notes}
      />
    </>
  );
}
