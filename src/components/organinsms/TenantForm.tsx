import { useForm, type SubmitHandler } from "react-hook-form";
import {
  TenantSchema,
  type TenantFormValues,
} from "../../models/TenantCreate.model";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../atoms/FormInput";
import FormTextArea from "../atoms/FormTextArea";
import { postTenant } from "../../utils/connections";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../atoms/ConfirmModal";

export default function TenantForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TenantFormValues | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TenantFormValues>({
    resolver: zodResolver(TenantSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TenantFormValues> = (data) => {
    setFormData(data);
    setIsOpen(true);
  };

  const confirmCreation = async () => {
    if (formData) {
      const tenant = {
        isil: `${formData.country}-${formData.abrevations}`,
        name: formData.name,
        description: formData.description,
      };

      await postTenant(tenant);
      navigate(-1);
    }
  };

  return (
    <>
      <form id="tenantForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 w-full gap-4">
          <FormInput<TenantFormValues>
            label="Nombre"
            placeholder="Institucion 1"
            name="name"
            className="col-span-2"
            register={register}
            error={errors.name}
          />
          <FormInput<TenantFormValues>
            label="Abreviacion"
            placeholder="MA-INAA"
            name="abrevations"
            register={register}
            error={errors.abrevations}
          />
          <FormInput<TenantFormValues>
            label="Pais"
            placeholder="BO"
            name="country"
            register={register}
            error={errors.country}
          />
        </div>
        <FormTextArea<TenantFormValues>
          label="Descripcion"
          name="description"
          register={register}
          error={errors.description}
        />
      </form>
      <ConfirmModal
        isOpen={isOpen}
        title="Crear Institución"
        message={`¿Estás seguro de crear la institución con nombre '${formData?.name}' e ISIL: '${formData?.country}-${formData?.abrevations}'?`}
        onCancel={() => {
          setIsOpen(!isOpen);
        }}
        onConfirm={confirmCreation}
      />
    </>
  );
}
