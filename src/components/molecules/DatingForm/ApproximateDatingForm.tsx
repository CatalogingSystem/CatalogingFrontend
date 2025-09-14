import { useFormContext } from "react-hook-form";
import type { DatingFormValues } from "../../../models/DatingModels/Dating.model";
import FormSelect from "../../atoms/FormSelect";

export default function ApproximateDatingForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DatingFormValues>();

  const PeriodEnum = [
    "BeginningOfCentury",
    "MidCentury",
    "EndOfCentury",
    "FirstHalfOfCentury",
    "SecondHalfOfCentury",
    "FirstThirdOfCentury",
    "SecondThirdOfCentury",
    "LastThirdOfCentury",
    "FirstQuarterOfCentury",
    "SecondQuarterOfCentury",
    "ThirdQuarterOfCentury",
    "LastQuarterOfCentury",
  ] as const;

  return (
    <>
      <FormSelect
        label="Desde Siglo"
        name="approximateDating.fromCentury"
        register={register}
        options={PeriodEnum.map((period) => ({
          value: period,
          label: period.replace(/([A-Z])/g, " $1").trim(),
        }))}
        placeholder="Seleccione un periodo"
        error={errors.approximateDating?.fromCentury}
      />
      <FormSelect
        label="Hasta Siglo"
        name="approximateDating.toCentury"
        register={register}
        options={PeriodEnum.map((period) => ({
          value: period,
          label: period.replace(/([A-Z])/g, " $1").trim(),
        }))}
        placeholder="Seleccione un periodo"
        error={errors.approximateDating?.toCentury}
      />
    </>
  );
}
