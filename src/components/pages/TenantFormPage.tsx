import { useEffect } from "react";
import TenantForm from "../organinsms/TenantForm";
import FormTemplate from "../templates/FormTemplate";
import { useFormStore } from "../../Zustand/stores/FormStore";

export default function TenantFormPage() {
  const {setTitle} = useFormStore();

  useEffect(() => {
    setTitle("Crear Nueva Institucion");
  }, [setTitle]);

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
