import { useFormContext } from "react-hook-form";
import type { ImageRecordFormValues } from "../../../models/GraphicDocumentation/GraphicDocumentation.model";
import FormInput from "../../atoms/FormInput";
import FormTextArea from "../../atoms/FormTextArea";

export default function AuthorImageGraphicDocumentationForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ImageRecordFormValues>();
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-6 gap-x-6">
        <FormInput
          label="Nombre"
          name="imageAuthor.firstName"
          register={register}
          error={errors.imageAuthor?.firstName}
        />
        <FormInput
          label="Apellido"
          name="imageAuthor.lastName"
          register={register}
          error={errors.imageAuthor?.lastName}
        />
        <FormInput
          label="Cedula de identidad"
          name="imageAuthor.identityCard"
          register={register}
          error={errors.imageAuthor?.identityCard}
        />
        <FormInput
          label="Identificacion Institucional"
          name="imageAuthor.institutionalId"
          register={register}
          error={errors.imageAuthor?.institutionalId}
        />
        <FormInput
          label="Institucion"
          name="imageAuthor.institution"
          register={register}
          error={errors.imageAuthor?.institution}
        />
        <FormInput
          label="Direccion / Calle / Numero"
          name="imageAuthor.address"
          register={register}
          error={errors.imageAuthor?.address}
        />
        <FormInput
          label="Localidad"
          name="imageAuthor.locality"
          register={register}
          error={errors.imageAuthor?.locality}
        />
        <FormInput
          label="Provincia"
          name="imageAuthor.province"
          register={register}
          error={errors.imageAuthor?.province}
        />
        <FormInput
          label="Departamento"
          name="imageAuthor.department"
          register={register}
          error={errors.imageAuthor?.department}
        />
        <FormInput
          label="Pais"
          name="imageAuthor.country"
          register={register}
          error={errors.imageAuthor?.country}
        />
        <FormInput
          label="Numero de telefono"
          name="imageAuthor.phoneNumber"
          register={register}
          error={errors.imageAuthor?.phoneNumber}
        />
        <FormInput
          label="Email"
          name="imageAuthor.email"
          type="email"
          register={register}
          error={errors.imageAuthor?.email}
        />
      </div>
      <FormTextArea
        label="Referencias"
        name="imageAuthor.references"
        register={register}
        error={errors.imageAuthor?.references}
      />
    </>
  );
}
