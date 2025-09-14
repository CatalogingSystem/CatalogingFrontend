import { useFormContext } from "react-hook-form";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function ApplicantForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput<TemporalMovement>
          label="Nombre"
          name="applicant.firstName"
          register={register}
          error={errors.applicant?.firstName}
        />
        <FormInput<TemporalMovement>
          label="Apellido"
          name="applicant.lastName"
          register={register}
          error={errors.applicant?.lastName}
        />
        <FormInput<TemporalMovement>
          label="Cedula del identidad"
          name="applicant.identityCard"
          register={register}
          error={errors.applicant?.identityCard}
        />
        <FormInput<TemporalMovement>
          label="Identificador Institucional"
          name="applicant.institutionalId"
          register={register}
          error={errors.applicant?.institutionalId}
        />
        <FormInput<TemporalMovement>
          label="Institucion"
          name="applicant.institution"
          register={register}
          error={errors.applicant?.institution}
        />
        <FormInput<TemporalMovement>
          label="Direccion"
          name="applicant.address"
          register={register}
          error={errors.applicant?.address}
        />
        <FormInput<TemporalMovement>
          label="Localidad"
          name="applicant.locality"
          register={register}
          error={errors.applicant?.locality}
        />
        <FormInput<TemporalMovement>
          label="Provincia"
          name="applicant.province"
          register={register}
          error={errors.applicant?.province}
        />
        <FormInput<TemporalMovement>
          label="Departamento"
          name="applicant.department"
          register={register}
          error={errors.applicant?.department}
        />
        <FormInput<TemporalMovement>
          label="Pais"
          name="applicant.country"
          register={register}
          error={errors.applicant?.country}
        />
        <FormInput<TemporalMovement>
          label="Telefono"
          name="applicant.phoneNumber"
          register={register}
          error={errors.applicant?.phoneNumber}
        />
        <FormInput<TemporalMovement>
          label="Correo Electronico"
          name="applicant.email"
          type="email"
          register={register}
          error={errors.applicant?.email}
        />
      </div>
      <FormTextArea<TemporalMovement>
        label="Referencias"
        name="applicant.references"
        register={register}
        error={errors.applicant?.references}
      />
      <FormTextArea<TemporalMovement>
        label="Observaciones"
        name="applicant.observations"
        register={register}
        error={errors.applicant?.observations}
      />
    </>
  );
}
