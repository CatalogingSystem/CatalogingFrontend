import GeneralInformation from "../components/molecules/Conservation/GeneralInformation";
import TreatmentForm from "../components/molecules/Conservation/TreatmentForm";

export const conservationTabs = [
  {
    tabTitle: "Analisis",
    component: <GeneralInformation />,
  },
  {
    tabTitle: "Tratamientos",
    component: <TreatmentForm />,
  },
];
