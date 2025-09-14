import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
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
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import FormInputImage from "../atoms/FormInputImage";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImage } from "../../utils/cloudinary";

export default function TenantForm() {
  const { jwt } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TenantFormValues | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    setValue,
  } = useForm<TenantFormValues>({
    resolver: zodResolver(TenantSchema),
    mode: "onBlur",
  });

  const image = useWatch({
    control,
    name: "imageUrl",
  });

  const onSubmit: SubmitHandler<TenantFormValues> = async (data) => {
    const imageUrl = await uploadImage(
      image,
      `${data.country}-${data.abrevations}`
    );

    const newData = {
      ...data,
      imageUrl: imageUrl ? imageUrl : null,
    };
    setFormData(newData);
    setIsOpen(true);
  };

  const confirmCreation = async () => {
    if (formData) {
      const tenant = {
        isil: `${formData.country}-${formData.abrevations}`,
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
        jwt,
      };

      await postTenant(tenant);
      navigate(-1);
    }
  };

  const handleOnImageChange = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setValue("imageUrl", file);
    setPreviewImage(imageUrl);
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
        {!previewImage && (
          <FormInputImage<TenantFormValues>
            label="Logo de la Institución"
            name="imageUrl"
            register={register}
            error={errors.imageUrl}
            className="w-full"
            readOnly={false}
            handleOnChange={handleOnImageChange}
          />
        )}
        {previewImage && (
          <figure className="flex flex-col items-center relative">
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 max-h-56 w-full object-contain"
            />
            <button
              type="button"
              className="btn btn-secondary mt-2 absolute top-0 right-0"
              onClick={() => {
                setPreviewImage(null);
                setValue("imageUrl", null);
              }}
            >
              <CloseIcon />
            </button>
          </figure>
        )}
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
