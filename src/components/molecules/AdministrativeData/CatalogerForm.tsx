import { useFormContext } from "react-hook-form";
import FormInput from "../../atoms/FormInput";
import type { AdministrativeData } from "../../../models/AdministrativeData/AdministrativeData.model";
import FormTextArea from "../../atoms/FormTextArea";

export default function CatalogerForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AdministrativeData>();

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FormInput<AdministrativeData>
          label="Nombre"
          name="cataloger.firstName"
          register={register}
          error={errors.cataloger?.firstName}
        />
        <FormInput<AdministrativeData>
          label="Apellido"
          name="cataloger.lastName"
          register={register}
          error={errors.cataloger?.lastName}
        />
        <FormInput<AdministrativeData>
          label="Documento de identidad"
          name="cataloger.identityCard"
          register={register}
          error={errors.cataloger?.identityCard}
        />
        <FormInput<AdministrativeData>
          label="Institución"
          name="cataloger.institution"
          register={register}
          error={errors.cataloger?.institution}
        />
        <FormInput<AdministrativeData>
          label="Dirección"
          name="cataloger.address"
          register={register}
          error={errors.cataloger?.address}
        />
        <FormInput<AdministrativeData>
          label="Localidad"
          name="cataloger.locality"
          register={register}
          error={errors.cataloger?.locality}
        />
        <FormInput<AdministrativeData>
          label="Provincia"
          name="cataloger.province"
          register={register}
          error={errors.cataloger?.province}
        />
        <FormInput<AdministrativeData>
          label="Departamento"
          name="cataloger.department"
          register={register}
          error={errors.cataloger?.department}
        />
        <FormInput<AdministrativeData>
          label="País"
          name="cataloger.country"
          register={register}
          error={errors.cataloger?.country}
        />
        <FormInput<AdministrativeData>
          label="Teléfono"
          name="cataloger.phoneNumber"
          register={register}
          error={errors.cataloger?.phoneNumber}
        />
        <FormInput<AdministrativeData>
          label="Email"
          name="cataloger.email"
          type="email"
          register={register}
          error={errors.cataloger?.email}
        />
        <FormInput<AdministrativeData>
          label="Referencias"
          name="cataloger.references"
          register={register}
          error={errors.cataloger?.references}
        />
      </section>
      <FormTextArea<AdministrativeData>
        label="Observaciones"
        name="cataloger.observations"
        register={register}
        error={errors.cataloger?.observations}
      />
    </>
  );
}
