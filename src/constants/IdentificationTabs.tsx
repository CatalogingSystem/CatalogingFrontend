import AuthorIdentificationForm from "../components/organinsms/AuthorIdentificationForm";
import GeneralInformationIdentificationForm from "../components/organinsms/GeneralInformationIdentificationForm";
import ObservationIdentificationForm from "../components/organinsms/ObservationIdentificationForm";
import SectionIdentificationForm from "../components/organinsms/SectionIdentificationForm";
import SpecificNameIdentificationForm from "../components/organinsms/SpecificNameIdentificationForm";
import MaterialIdentificationForm from "../components/organinsms/SubjectIdentificationForm";
import TechniqueIdentificationForm from "../components/organinsms/TechniqueIdentificationForm";
import TitleIdentificationForm from "../components/organinsms/TitleIdentificationForm";
import TypologyIdentificationForm from "../components/organinsms/TypologyIdentificationForm";

export const identificationTabs = [
  {
    tabTitle: "Informacion General",
    component: <GeneralInformationIdentificationForm />,
  },
  {
    tabTitle: "Seccion",
    component: <SectionIdentificationForm />,
  },
  {
    tabTitle: "Tipologia",
    component: <TypologyIdentificationForm />,
  },
  {
    tabTitle: "Nombre especifico",
    component: <SpecificNameIdentificationForm />,
  },
  {
    tabTitle: "Autor Identificacion",
    component: <AuthorIdentificationForm />,
  },
  {
    tabTitle: "Titulo",
    component: <TitleIdentificationForm />,
  },
  {
    tabTitle: "Materia",
    component: <MaterialIdentificationForm />,
  },
  {
    tabTitle: "Tecnica",
    component: <TechniqueIdentificationForm />,
  },
  {
    tabTitle: "Observaciones",
    component: <ObservationIdentificationForm />,
  },
];
