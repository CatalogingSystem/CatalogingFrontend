import { useFormContext } from "react-hook-form";
import FormInput from "../../atoms/FormInput";
import { useFormValuesStore } from "../../../Zustand/stores/FormValueStore";
import type { AdministrativeData } from "../../../models/AdministrativeData/AdministrativeData.model";
import FormSelect from "../../atoms/FormSelect";
import FormTextArea from "../../atoms/FormTextArea";

export default function FormOfEntryForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdministrativeData>();

  const { getValue } = useFormValuesStore();

  const entryForms = [
    "SelectAnOption",
    "ByConfiscation",
    "Purchase",
    "Dation",
    "Excavation",
    "Bequest",
    "Donation",
    "OrderingAndReordering",
    "Exchange",
    "Awards",
    "Usucapion",
    "RegistrationByReintegration",
    "ChangeOfAssignment",
    "Offering",
    "OwnProduction",
    "Collection",
    "ForStudy",
    "Exhibition",
    "Conservation",
    "PublicOwnershipDeposit",
    "ThirdPartyDeposit",
    "JudicialDeposit",
    "DepositPriorToAcquisition",
  ];

  return (
    <>
      <FormInput<AdministrativeData>
        label="Expediente"
        name="fileNumber"
        type="number"
        register={register}
        value={getValue("administrativeFile", "expediente")}
        error={errors.fileNumber}
        readOnly
      />
      <FormInput<AdministrativeData>
        label="Fecha de ingreso"
        name="entryDate"
        register={register}
        error={errors.entryDate}
        type="date"
      />
      <FormSelect<AdministrativeData>
        label="Forma de ingreso"
        name="entryForm"
        register={register}
        options={entryForms.map((form) => ({
          value: form,
          label: form.replace(/([A-Z])/g, " $1").trim(),
        }))}
        error={errors.entryForm}
      />
      <FormInput<AdministrativeData>
        label="Fuente de ingreso"
        name="entrySource"
        register={register}
        error={errors.entrySource}
      />
      <FormInput<AdministrativeData>
        label="Tipo de colección"
        name="collectionType"
        register={register}
        error={errors.collectionType}
      />
      <FormInput<AdministrativeData>
        label="Fecha de catalogación"
        name="catalogingDate"
        register={register}
        type="date"
        error={errors.catalogingDate}
      />
      <FormTextArea<AdministrativeData>
        label="Observaciones"
        name="observations"
        register={register}
        error={errors.observations}
      />
    </>
  );
}
