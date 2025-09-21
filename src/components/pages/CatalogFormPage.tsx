import { useEffect } from "react";
import AdminFileFormPage from "../organinsms/AdminFileForm";
import GraphicDocumentation from "../organinsms/GraphicDocumentation";
import IdentificationForm from "../organinsms/IdentificationForm";
import StepForm from "../organinsms/StepForm";
import FormTemplate from "../templates/FormTemplate";
import { useFormStore } from "../../Zustand/stores/FormStore";
import DatingForm from "../organinsms/DatingForm";
import AdministrativeDataForm from "../organinsms/AdministrativeDataForm";
import ConservationForm from "../organinsms/ConservationForm";

export default function CatalogFormPage() {
  const { reset } = useFormStore();

  const steps = [
    {
      tabTitle: "Archivo Administrativo",
      component: <AdminFileFormPage />,
    },
    {
      tabTitle: "Identificacion",
      component: <IdentificationForm />,
    },
    {
      tabTitle: "Datos Administrativa",
      component: <AdministrativeDataForm />,
    },
    {
      tabTitle: "Conservacion",
      component: <ConservationForm />,
    },
    {
      tabTitle: "Documentacion Grafica",
      component: <GraphicDocumentation />,
    },
    {
      tabTitle: "Datacion",
      component: <DatingForm />,
    },
  ];

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <FormTemplate>
      <StepForm items={steps} />
    </FormTemplate>
  );
}
