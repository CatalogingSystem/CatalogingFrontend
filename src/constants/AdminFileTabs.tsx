import {
  AdditionalDetailsForm,
  BasicInformationForm,
  DatesForm,
} from "../components/molecules/AdminFileForms";

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
