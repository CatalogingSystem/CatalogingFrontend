import {
  GeneralInformationIdentificationForm,
  SectionIdentificationForm,
  TypologyIdentificationForm,
  SpecificNameIdentificationForm,
  AuthorIdentificationForm,
  TitleIdentificationForm,
  MaterialIdentificationForm,
  TechniqueIdentificationForm,
  ObservationIdentificationForm,
} from "../components/molecules/IdentificationForm";

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
