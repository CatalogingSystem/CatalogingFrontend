import CatalogerForm from "../components/molecules/AdministrativeData/CatalogerForm";
import CopiesAndReproductionsForm from "../components/molecules/AdministrativeData/CopiesAndReproductionsForm";
import FormOfEntryForm from "../components/molecules/AdministrativeData/FormOfEntryForm";
import ValuationForm from "../components/molecules/AdministrativeData/ValuationForm";

export const administrativeDataTabs = [
  {
    tabTitle: "Forma de ingreso",
    component: <FormOfEntryForm />,
  },
  {
    tabTitle: "Copias y reproducciones",
    component: <CopiesAndReproductionsForm />,
  },
  {
    tabTitle: "Valuación",
    component: <ValuationForm />,
  },
  {
    tabTitle: "Catalogador",
    component: <CatalogerForm />,
  },
];
