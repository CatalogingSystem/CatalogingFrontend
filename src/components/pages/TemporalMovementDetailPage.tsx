import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCallback, useEffect, useState } from "react";
import type { TemporalMovementResponse } from "../../models/TemporalMovement/TemporalMovement.model";
import { useNavigate, useParams } from "react-router-dom";
import { getTemporalMovementsById } from "../../utils/connections";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import DetailCard from "../organinsms/DetailCard";
import { formatText } from "../../utils/separateWords";

export default function TemporalMovementDetailPage() {
  const { id, tenantId } = useParams<{ id: string; tenantId: string }>();
  const [data, setData] = useState<TemporalMovementResponse | null>(null);
  const { jwt } = useAuthStore();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!id || !tenantId || !jwt) return;

    try {
      const fetchedData = await getTemporalMovementsById(id, tenantId, jwt);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching temporal movement data:", error);
    }
  }, [id, jwt, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generalInformationPanels = [
    {
      title: "",
      items: [
        { title: "Expediente", value: data?.expediente ?? undefined },
        {
          title: "Tipo de Movimiento",
          value: formatText(data?.movementType || ""),
        },
        {
          title: "Ubicacion de Transferencia",
          value: data?.transferLocation ?? undefined,
        },
        { title: "Entidad", value: data?.entity ?? undefined },
        {
          title: "Fecha de Transferencia",
          value: data?.departureDate
            ? new Date(data?.departureDate).toLocaleDateString("es-ES")
            : undefined,
        },
        {
          title: "Fecha de Retorno",
          value: data?.returnDate
            ? new Date(data?.returnDate).toLocaleDateString("es-ES")
            : undefined,
        },
        {
          title: "Observaciones",
          value: data?.observations ?? undefined,
        },
      ],
    },
  ];

  const representativePanels = [
    {
      title: "",
      items: [
        { title: "Nombre", value: data?.representative.firstName },
        { title: "Apellido", value: data?.representative.lastName },
        {
          title: "Cedula de Identidad",
          value: data?.representative.identityCard,
        },
        {
          title: "ID Institucional",
          value: data?.representative.institutionalId,
        },
        { title: "Institucion", value: data?.representative.institution },
        { title: "Direccion", value: data?.representative.address },
        { title: "Localidad", value: data?.representative.locality },
        { title: "Provincia", value: data?.representative.province },
        { title: "Departamento", value: data?.representative.department },
        { title: "Pais", value: data?.representative.country },
        { title: "Telefono", value: data?.representative.phoneNumber },
        { title: "Correo Electronico", value: data?.representative.email },
        {
          title: "Referencias",
          value: data?.representative.references ?? undefined,
        },
        {
          title: "Observaciones",
          value: data?.representative.observations ?? undefined,
        },
      ],
    },
  ];
  const applicantPanels = [
    {
      title: "",
      items: [
        { title: "Nombre", value: data?.applicant.firstName },
        { title: "Apellido", value: data?.applicant.lastName },
        { title: "Cedula de Identidad", value: data?.applicant.identityCard },
        { title: "ID Institucional", value: data?.applicant.institutionalId },
        { title: "Institucion", value: data?.applicant.institution },
        { title: "Direccion", value: data?.applicant.address },
        { title: "Localidad", value: data?.applicant.locality },
        { title: "Provincia", value: data?.applicant.province },
        { title: "Departamento", value: data?.applicant.department },
        { title: "Pais", value: data?.applicant.country },
        { title: "Telefono", value: data?.applicant.phoneNumber },
        { title: "Correo Electronico", value: data?.applicant.email },
        {
          title: "Referencias",
          value: data?.applicant.references ?? undefined,
        },
        {
          title: "Observaciones",
          value: data?.applicant.observations ?? undefined,
        },
      ],
    },
  ];

  const authorizationPanels = [
    {
      title: "",
      items: [
        {
          title: "Documento",
          value: data?.document ?? undefined,
        },
        {
          title: "Codigo",
          value: data?.code ?? undefined,
        },
        {
          title: "Fecha de Autorizacion",
          value: data?.date
            ? new Date(data?.date).toLocaleDateString("es-ES")
            : undefined,
        },
      ],
    },
  ];

  const insurancePanels = [
    {
      title: "",
      items: [
        {
          title: "Compania Aseguradora",
          value: data?.insurer ?? undefined,
        },
        {
          title: "Poliza",
          value: data?.policy ?? undefined,
        },
        {
          title: "Notas",
          value: data?.notes ?? undefined,
        },
      ],
    },
  ];

  const transportationPanels = [
    {
      title: "Salida",
      items: [
        {
          title: "Empresa",
          value: data?.departure.company ?? undefined,
        },
        {
          title: "Ubicacion",
          value: data?.departure.location ?? undefined,
        },
        {
          title: "Fecha de Salida",
          value: data?.departure.date
            ? new Date(data?.departure.date).toLocaleDateString("es-ES")
            : undefined,
        },
        {
          title: "Hora de Salida",
          value: data?.departure.time ?? undefined,
        },
        {
          title: "Notas",
          value: data?.departure.notes ?? undefined,
        },
      ],
    },
    {
      title: "Retorno",
      items: [
        {
          title: "Empresa",
          value: data?.return.company ?? undefined,
        },
        {
          title: "Ubicacion",
          value: data?.return.location ?? undefined,
        },
        {
          title: "Fecha de Salida",
          value: data?.return.date
            ? new Date(data?.return.date).toLocaleDateString("es-ES")
            : undefined,
        },
        {
          title: "Hora de Salida",
          value: data?.return.time ?? undefined,
        },
        {
          title: "Notas",
          value: data?.return.notes ?? undefined,
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col gap-4 p-4">
      <header className="sticky top-0 z-10 bg-base-100 flex items-center justify-between p-4 shadow-md">
        <nav className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
          <h1 className="text-xl font-bold">Detalles del expediente</h1>
        </nav>
      </header>
      <DetailCard
        title="Informacion General"
        panels={generalInformationPanels}
      />
      <DetailCard title="Datos del Solicitante" panels={applicantPanels} />
      <DetailCard
        title="Datos del Representante"
        panels={representativePanels}
      />
      <DetailCard title="Autorizacion" panels={authorizationPanels} />
      <DetailCard title="Seguro" panels={insurancePanels} />
      <DetailCard title="Transporte" panels={transportationPanels} />
    </section>
  );
}
