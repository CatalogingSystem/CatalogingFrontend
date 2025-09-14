import { useFormContext } from "react-hook-form";
import type { DatingFormValues } from "../../../models/DatingModels/Dating.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function NotesForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DatingFormValues>();

  return (
    <>
      <FormInput
        label="Fecha Textual"
        name="notes.textualDate"
        register={register}
        error={errors.notes?.textualDate}
      />
      <FormInput
        label="Notas de Fecha Inicial"
        name="notes.initialDateNotes"
        register={register}
        error={errors.notes?.initialDateNotes}
      />
      <FormInput
        label="Notas de Fecha Final"
        name="notes.finalDateNotes"
        register={register}
        error={errors.notes?.finalDateNotes}
      />
      <FormTextArea
        label="Observaciones"
        name="notes.observations"
        register={register}
        error={errors.notes?.observations}
      />
    </>
  );
}
