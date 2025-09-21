import ApproximateDatingForm from "../components/molecules/DatingForm/ApproximateDatingForm";
import DateRangeForm from "../components/molecules/DatingForm/DateRangeForm";
import NotesForm from "../components/molecules/DatingForm/NotesForm";
import SimpleDateForm from "../components/molecules/DatingForm/SimpleDateForm";

export const datingTabs = [
  {
    tabTitle: "Fecha Simple",
    component: <SimpleDateForm />,
  },
  {
    tabTitle: "Rango de Fechas",
    component: <DateRangeForm />,
  },
  {
    tabTitle: "Dataciones Aproximadas",
    component: <ApproximateDatingForm />,
  },
  {
    tabTitle: "Notas",
    component: <NotesForm />,
  },
];
