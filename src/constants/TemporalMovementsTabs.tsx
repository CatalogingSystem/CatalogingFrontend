import ApplicantForm from "../components/molecules/TemporalMovement/ApplicantForm";
import AutorizationForm from "../components/molecules/TemporalMovement/AutorizationForm";
import GeneralInformationForm from "../components/molecules/TemporalMovement/GeneralInformationForm";
import InsuranceForm from "../components/molecules/TemporalMovement/InsuranceForm";
import RepresentativeForm from "../components/molecules/TemporalMovement/RepresentativeForm";
import TransportForm from "../components/molecules/TemporalMovement/TransportForm";

export const temporalMovementSteps = [
  {
    tabTitle: "Informacion General",
    component: <GeneralInformationForm />,
  },
  {
    tabTitle: "Solicitante",
    component: <ApplicantForm />,
  },
  {
    tabTitle: "Representante",
    component: <RepresentativeForm />,
  },
  {
    tabTitle: "Autorizacion",
    component: <AutorizationForm />,
  },
  {
    tabTitle: "Seguros",
    component: <InsuranceForm />,
  },
  {
    tabTitle: "Transporte",
    component: <TransportForm />,
  },
];
