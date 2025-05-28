import GraphicDocumentation from "../organinsms/GraphicDocumentation";
import IdentificationForm from "../organinsms/IdentificationForm";
import StepForm from "../organinsms/StepForm";
import FormTemplate from "../templates/FormTemplate";
import AdminFileFormPage from "./AdminFileFormPage";

export default function CatalogFormPage() {
  const steps = [
    {
      id: 1,
      tabTitle: "Archivo Administrativo",
      component: <AdminFileFormPage />,
    },
    {
      id: 2,
      tabTitle: "Identificacion",
      component: <IdentificationForm />
    },
    {
      id: 3,
      tabTitle: "Documentacion Grafica",
      component: <GraphicDocumentation />,
    },
  ];
  return (
    <FormTemplate>
      <StepForm items={steps} />
    </FormTemplate>
  );
}
