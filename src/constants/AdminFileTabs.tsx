import AdditionalDetailsForm from "../components/organinsms/AdditionalDetailsForm";
import BasicInformationForm from "../components/organinsms/BasicInformationForm";
import DatesForm from "../components/organinsms/DatesForm";

export const adminFileTabs = [
  {
    tabTitle: "Informacion Basica",
    component: <BasicInformationForm />,
  },
  {
    tabTitle: "Fechas",
    component: <DatesForm />,
  },
  {
    tabTitle: "Detalles Adicionales",
    component: <AdditionalDetailsForm />,
  },
];
