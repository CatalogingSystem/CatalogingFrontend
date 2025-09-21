import { useEffect } from "react";
import TenantForm from "../organinsms/TenantForm";
import FormTemplate from "../templates/FormTemplate";
import { useFormStore } from "../../Zustand/stores/FormStore";

export default function TenantFormPage() {
  const { setTitle, reset } = useFormStore();

  useEffect(() => {
    setTitle("Crear Nueva Institucion");

    return () => reset();
  }, [setTitle, reset]);

  return (
    <FormTemplate
      cancelBtn="Cancelar"
      confirmBtn="Crear Institucion"
      formId="tenantForm"
    >
      <TenantForm />
    </FormTemplate>
  );
}
