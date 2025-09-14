import { useFormContext } from "react-hook-form";
import type { TemporalMovement } from "../../../models/TemporalMovement/TemporalMovement.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function RepresentativeForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemporalMovement>();

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput<TemporalMovement>
          label="Nombre"
          name="representative.firstName"
          register={register}
          error={errors.representative?.firstName}
        />
        <FormInput<TemporalMovement>
          label="Apellido"
          name="representative.lastName"
          register={register}
          error={errors.representative?.lastName}
        />
        <FormInput<TemporalMovement>
          label="Cedula del identidad"
          name="representative.identityCard"
          register={register}
          error={errors.representative?.identityCard}
        />
        <FormInput<TemporalMovement>
          label="Identificador Institucional"
          name="representative.institutionalId"
          register={register}
          error={errors.representative?.institutionalId}
        />
        <FormInput<TemporalMovement>
          label="Institucion"
          name="representative.institution"
          register={register}
          error={errors.representative?.institution}
        />
        <FormInput<TemporalMovement>
          label="Direccion"
          name="representative.address"
          register={register}
          error={errors.representative?.address}
        />
        <FormInput<TemporalMovement>
          label="Localidad"
          name="representative.locality"
          register={register}
          error={errors.representative?.locality}
        />
        <FormInput<TemporalMovement>
          label="Provincia"
          name="representative.province"
          register={register}
          error={errors.representative?.province}
        />
        <FormInput<TemporalMovement>
          label="Departamento"
          name="representative.department"
          register={register}
          error={errors.representative?.department}
        />
        <FormInput<TemporalMovement>
          label="Pais"
          name="representative.country"
          register={register}
          error={errors.representative?.country}
        />
        <FormInput<TemporalMovement>
          label="Telefono"
          name="representative.phoneNumber"
          register={register}
          error={errors.representative?.phoneNumber}
        />
        <FormInput<TemporalMovement>
          label="Correo Electronico"
          name="representative.email"
          type="email"
          register={register}
          error={errors.representative?.email}
        />
      </div>
      <FormTextArea<TemporalMovement>
        label="Referencias"
        name="representative.references"
        register={register}
        error={errors.representative?.references}
      />
      <FormTextArea<TemporalMovement>
        label="Observaciones"
        name="representative.observations"
        register={register}
        error={errors.representative?.observations}
      />
    </>
  );
}
