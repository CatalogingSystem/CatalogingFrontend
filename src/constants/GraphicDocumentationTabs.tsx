import {
  AuthorImageGraphicDocumentationForm,
  GeneralInformationGraphicDocumentationForm,
  ImagesGraphicDocumentationForm,
  ObservationGraphicDocumentationForm,
  SpecificInformationGraphicDocumentationForm,
} from "../components/molecules/GraphicDocumentationForm";

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
