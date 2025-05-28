import AuthorImageGraphicDocumentationForm from "../components/organinsms/AuthorImageGraphicDocumentationForm";
import GeneralInformationGraphicDocumentationForm from "../components/organinsms/GeneralInformationGraphicDocumentation";
import ImagesGraphicDocumentationForm from "../components/organinsms/ImagesGraphicDocumentationForm";
import ObservationGraphicDocumentationForm from "../components/organinsms/ObservationGraphicDocumentationForm";
import SpecificInformationGraphicDocumentationForm from "../components/organinsms/SpecificInformationGraphicDocumentation";

export const graphicDocumentationTabs = [
  {
    tabTitle: "Informacion General",
    component: <GeneralInformationGraphicDocumentationForm />,
  },
  {
    tabTitle: "Informacion Especifica",
    component: <SpecificInformationGraphicDocumentationForm />,
  },
  {
    tabTitle: "Autor Imagen",
    component: <AuthorImageGraphicDocumentationForm />,
  },
  {
    tabTitle: "Imagenes",
    component: <ImagesGraphicDocumentationForm />,
  },
  {
    tabTitle: "Observaciones",
    component: <ObservationGraphicDocumentationForm />,
  },
];
