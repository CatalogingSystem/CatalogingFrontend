import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useCallback, useEffect, useState } from "react";
import { getCatalogItemByRecord } from "../../utils/connections";
import DetailCard from "../organinsms/DetailCard";
import { formatText } from "../../utils/separateWords";
import AutoCarousel from "../atoms/AutoCarousel";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import type { CatalogModel } from "../../models/Catalog.model";

export default function DetailCatalogPage() {
  const { id, tenantId } = useParams();
  const record = parseInt(id || "1");
  const { jwt } = useAuthStore();
  const [catalogItem, setCatalogItem] = useState<CatalogModel>();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!tenantId) return;

    const res = await getCatalogItemByRecord(record, tenantId, jwt);
    setCatalogItem(res.items[0]);
  }, [jwt, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const adminFile = [
    {
      title: "Informacion Basica",
      items: [
        {
          title: "Institucion",
          value: formatText(
            catalogItem?.archivoAdministrativo.institucion || ""
          ),
        },
        {
          title: "Unidad",
          value: catalogItem?.archivoAdministrativo.unidad?.toString(),
        },
        {
          title: "Expediente",
          value: catalogItem?.expediente?.toString(),
        },
        {
          title: "Serie",
          value: catalogItem?.archivoAdministrativo.serie?.toString(),
        },
        {
          title: "Unidad",
          value: formatText(
            catalogItem?.archivoAdministrativo.documentoOrigen || ""
          ),
        },
      ],
    },
    {
      title: "Fechas",
      items: [
        {
          title: "Fecha Inicial",
          value: formatDate(catalogItem?.archivoAdministrativo.fechaInicial),
        },
        {
          title: "Fecha Final",
          value: formatDate(catalogItem?.archivoAdministrativo.fechaFinal),
        },
      ],
    },
    {
      title: "Detalles Adicionales",
      items: [
        {
          title: "Expediente Anterior",
          value: catalogItem?.archivoAdministrativo.expedienteAnterior,
        },
        {
          title: "Asunto",
          value: catalogItem?.archivoAdministrativo.asunto,
        },
        {
          title: "Peticion de Transferencia",
          value: catalogItem?.archivoAdministrativo.peticionTransferencia
            ? "Si"
            : "No",
        },
        {
          title: "Historial",
          value: catalogItem?.archivoAdministrativo.historial,
        },
        {
          title: "Archivo Documental",
          value: catalogItem?.archivoAdministrativo.archivoDocumental,
        },
        {
          title: "Observaciones",
          value: catalogItem?.archivoAdministrativo.observaciones,
        },
      ],
    },
  ];

  const identification = [
    {
      title: "Informacion General",
      items: [
        {
          title: "Inventario",
          value:
            catalogItem?.identification?.inventory != null
              ? catalogItem.identification.inventory.toString()
              : undefined,
        },
        {
          title: "Número de Objetos",
          value:
            catalogItem?.identification?.numberOfObjects != null
              ? catalogItem.identification.numberOfObjects.toString()
              : undefined,
        },
        {
          title: "Clasificación Genérica",
          value:
            catalogItem?.identification?.genericClassification ?? undefined,
        },
        {
          title: "Nombre del Objeto",
          value: catalogItem?.identification?.objectName ?? undefined,
        },
      ],
    },
    {
      title: "Seccion",
      items: [
        {
          title: "Sala",
          value: catalogItem?.identification?.section?.room ?? undefined,
        },
        {
          title: "Panel",
          value: catalogItem?.identification?.section?.panel ?? undefined,
        },
        {
          title: "Vitrina",
          value: catalogItem?.identification?.section?.displayCase ?? undefined,
        },
        {
          title: "Caballete",
          value: catalogItem?.identification?.section?.easel ?? undefined,
        },
        {
          title: "Depósito",
          value: catalogItem?.identification?.section?.storage ?? undefined,
        },
        {
          title: "Patio",
          value: catalogItem?.identification?.section?.courtyard ?? undefined,
        },
        {
          title: "Pilar",
          value: catalogItem?.identification?.section?.pillar ?? undefined,
        },
        {
          title: "Otros",
          value: catalogItem?.identification?.section?.others ?? undefined,
        },
      ],
    },
    {
      title: "Tipología",
      items: [
        {
          title: "Tipo",
          value: catalogItem?.identification?.typology?.type ?? undefined,
        },
        {
          title: "Subtipo",
          value: catalogItem?.identification?.typology?.subtype ?? undefined,
        },
        {
          title: "Clase",
          value: catalogItem?.identification?.typology?.class ?? undefined,
        },
        {
          title: "Subclase",
          value: catalogItem?.identification?.typology?.subclass ?? undefined,
        },
        {
          title: "Orden",
          value: catalogItem?.identification?.typology?.order ?? undefined,
        },
        {
          title: "Suborden",
          value: catalogItem?.identification?.typology?.suborder ?? undefined,
        },
      ],
    },
    {
      title: "Nombre Específico",
      items: [
        {
          title: "Nombre Genérico",
          value:
            catalogItem?.identification?.specificName?.genericName ?? undefined,
        },
        {
          title: "Términos Relacionados",
          value:
            catalogItem?.identification?.specificName?.relatedTerms ??
            undefined,
        },
        {
          title: "Términos Específicos",
          value:
            catalogItem?.identification?.specificName?.specificTerms ??
            undefined,
        },
        {
          title: "Usado Por",
          value: catalogItem?.identification?.specificName?.usedBy ?? undefined,
        },
        {
          title: "Notas",
          value: catalogItem?.identification?.specificName?.notes ?? undefined,
        },
      ],
    },
    {
      title: "Autor",
      items: [
        {
          title: "Nombre",
          value: catalogItem?.identification?.author?.name ?? undefined,
        },
        {
          title: "Lugar de Nacimiento",
          value: catalogItem?.identification?.author?.birthPlace ?? undefined,
        },
        {
          title: "Fecha de Nacimiento",
          value:
            formatDate(catalogItem?.identification?.author?.birthDate) ??
            undefined,
        },
        {
          title: "Lugar de Fallecimiento",
          value: catalogItem?.identification?.author?.deathPlace ?? undefined,
        },
        {
          title: "Fecha de Fallecimiento",
          value:
            formatDate(catalogItem?.identification?.author?.deathDate) ??
            undefined,
        },
      ],
    },
    {
      title: "Título",
      items: [
        {
          title: "Titulo",
          value: catalogItem?.identification?.title?.name ?? undefined,
        },
        {
          title: "Atribución",
          value: catalogItem?.identification?.title?.attribution ?? undefined,
        },
        {
          title: "Traducción",
          value: catalogItem?.identification?.title?.translation ?? undefined,
        },
      ],
    },
    {
      title: "Material",
      items: [
        {
          title: "Nombre del Material",
          value:
            catalogItem?.identification?.material?.materialName ?? undefined,
        },
        {
          title: "Parte Descrita",
          value:
            catalogItem?.identification?.material?.describedPart ?? undefined,
        },
        {
          title: "Colores",
          value: catalogItem?.identification?.material?.colors ?? undefined,
        },
      ],
    },
    {
      title: "Técnicas",
      items: [
        {
          title: "Nombre de la Técnica",
          value:
            catalogItem?.identification?.techniques?.techniqueName ?? undefined,
        },
        {
          title: "Parte Descrita",
          value:
            catalogItem?.identification?.techniques?.describedPart ?? undefined,
        },
      ],
    },
    {
      title: "Observaciones",
      items: [
        {
          title: "Observaciones Generales",
          value: catalogItem?.identification?.observations ?? undefined,
        },
      ],
    },
  ];

  const graphicDocumentation = [
    {
      title: "Información General",
      items: [
        {
          title: "Expediente",
          value:
            catalogItem?.graphicDocumentation?.expediente != null
              ? String(catalogItem.graphicDocumentation.expediente)
              : undefined,
        },
        {
          title: "Inventario",
          value:
            catalogItem?.identification?.inventory != null
              ? String(catalogItem.identification.inventory)
              : undefined,
        },
        {
          title: "Descripción",
          value: catalogItem?.graphicDocumentation?.description ?? undefined,
        },
        {
          title: "Datos Técnicos",
          value: catalogItem?.graphicDocumentation?.technicalData ?? undefined,
        },
      ],
    },
    {
      title: "Información Específica",
      items: [
        {
          title: "Número Genérico",
          value:
            catalogItem?.graphicDocumentation?.genericControlNumber != null
              ? String(catalogItem.graphicDocumentation.genericControlNumber)
              : undefined,
        },
        {
          title: "Número Específico",
          value:
            catalogItem?.graphicDocumentation?.specificControlNumber != null
              ? String(catalogItem.graphicDocumentation.specificControlNumber)
              : undefined,
        },
        {
          title: "Fecha",
          value: catalogItem?.graphicDocumentation?.date ?? undefined,
        },
        {
          title: "Ancho",
          value:
            catalogItem?.graphicDocumentation?.dimensions?.width != null
              ? String(catalogItem.graphicDocumentation.dimensions.width)
              : undefined,
        },
        {
          title: "Alto",
          value:
            catalogItem?.graphicDocumentation?.dimensions?.height != null
              ? String(catalogItem.graphicDocumentation.dimensions.height)
              : undefined,
        },
      ],
    },
    {
      title: "Autor Imagen",
      items: [
        {
          title: "Nombre",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.firstName ??
            undefined,
        },
        {
          title: "Apellido",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.lastName ??
            undefined,
        },
        {
          title: "Cédula de Identidad",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.identityCard ??
            undefined,
        },
      ],
    },
    {
      title: "Identificación Institucional",
      items: [
        {
          title: "Institución",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.institution ??
            undefined,
        },
        {
          title: "Dirección / Calle / Número",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.address ??
            undefined,
        },
        {
          title: "Localidad",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.locality ??
            undefined,
        },
        {
          title: "Provincia",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.province ??
            undefined,
        },
        {
          title: "Departamento",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.department ??
            undefined,
        },
        {
          title: "País",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.country ??
            undefined,
        },
        {
          title: "Número de Teléfono",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.phoneNumber ??
            undefined,
        },
        {
          title: "Email",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.email ?? undefined,
        },
        {
          title: "Referencias",
          value:
            catalogItem?.graphicDocumentation?.imageAuthor?.references ??
            undefined,
        },
      ],
    },
    {
      title: "Observaciones",
      items: [
        {
          title: "Observaciones Generales",
          value:
            catalogItem?.graphicDocumentation?.generalObservations ?? undefined,
        },
      ],
    },
  ];

  const administrativeData = [
    {
      title: "Datos Administrativos",
      items: [
        {
          title: "Fecha de Ingreso",
          value:
            catalogItem?.administrativeData?.entryDate != null
              ? formatDate(catalogItem.administrativeData.entryDate)
              : undefined,
        },
        {
          title: "Formulario de Ingreso",
          value: catalogItem?.administrativeData?.entryForm ?? undefined,
        },
        {
          title: "Fuente de Ingreso",
          value: catalogItem?.administrativeData?.entrySource ?? undefined,
        },
        {
          title: "Tipo de Colección",
          value: catalogItem?.administrativeData?.collectionType ?? undefined,
        },
        {
          title: "Fecha de Catalogación",
          value:
            catalogItem?.administrativeData?.catalogingDate != null
              ? formatDate(catalogItem.administrativeData.catalogingDate)
              : undefined,
        },
        {
          title: "Observaciones",
          value: catalogItem?.administrativeData?.observations ?? undefined,
        },
      ],
    },
    {
      title: "Copias y Reproducciones",
      items: [
        {
          title: "Autor",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.author ??
            undefined,
        },
        {
          title: "Título Original",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.originalTitle ?? undefined,
        },
        {
          title: "Método",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.method ??
            undefined,
        },
        {
          title: "Formato",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.format ??
            undefined,
        },
        {
          title: "Destino Original",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.originalDestination ?? undefined,
        },
        {
          title: "Ubicación",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.location ??
            undefined,
        },
        {
          title: "Fecha",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.date != null
              ? formatDate(
                  catalogItem.administrativeData.copiesReproductions.date
                )
              : undefined,
        },
        {
          title: "Notas",
          value:
            catalogItem?.administrativeData?.copiesReproductions?.notes ??
            undefined,
        },
      ],
    },
    {
      title: "Valoración",
      items: [
        {
          title: "Valor",
          value: catalogItem?.administrativeData?.valuation?.value ?? undefined,
        },
        {
          title: "Tasador",
          value:
            catalogItem?.administrativeData?.valuation?.appraiser ?? undefined,
        },
        {
          title: "Fecha",
          value:
            catalogItem?.administrativeData?.valuation?.date != null
              ? formatDate(catalogItem.administrativeData.valuation.date)
              : undefined,
        },
        {
          title: "Notas",
          value: catalogItem?.administrativeData?.valuation?.notes ?? undefined,
        },
      ],
    },
    {
      title: "Catalogador",
      items: [
        {
          title: "Nombre",
          value:
            catalogItem?.administrativeData?.cataloger?.firstName ?? undefined,
        },
        {
          title: "Apellido",
          value:
            catalogItem?.administrativeData?.cataloger?.lastName ?? undefined,
        },
        {
          title: "Cédula de Identidad",
          value:
            catalogItem?.administrativeData?.cataloger?.identityCard ?? undefined,
        },
        {
          title: "Institución",
          value:
            catalogItem?.administrativeData?.cataloger?.institution ?? undefined,
        },
        {
          title: "Dirección",
          value: catalogItem?.administrativeData?.cataloger?.address ?? undefined,
        },
        {
          title: "Localidad",
          value:
            catalogItem?.administrativeData?.cataloger?.locality ?? undefined,
        },
        {
          title: "Provincia",
          value:
            catalogItem?.administrativeData?.cataloger?.province ?? undefined,
        },
        {
          title: "Departamento",
          value:
            catalogItem?.administrativeData?.cataloger?.department ?? undefined,
        },
        {
          title: "País",
          value: catalogItem?.administrativeData?.cataloger?.country ?? undefined,
        },
        {
          title: "Número de Teléfono",
          value:
            catalogItem?.administrativeData?.cataloger?.phoneNumber ?? undefined,
        },
        {
          title: "Email",
          value: catalogItem?.administrativeData?.cataloger?.email ?? undefined,
        },
        {
          title: "Referencias",
          value:
            catalogItem?.administrativeData?.cataloger?.references ?? undefined,
        },
        {
          title: "Observaciones",
          value:
            catalogItem?.administrativeData?.cataloger?.observations ?? undefined,
        },
      ],
    },
  ];

  const conservationData = [
    {
      title: "Analisis",
      items: [
        {
          title: "Area Afectada",
          value: catalogItem?.conservation?.affectedArea ?? undefined,
        },
        {
          title: "Longitud",
          value: catalogItem?.conservation?.length?.toString() ?? undefined,
        },
        {
          title: "Ancho",
          value: catalogItem?.conservation?.width?.toString() ?? undefined,
        },
        {
          title: "Profundidad",
          value: catalogItem?.conservation?.depth?.toString() ?? undefined,
        },
        {
          title: "Tipos de Análisis",
          value: catalogItem?.conservation?.analysisTypes ?? undefined,
        },
        {
          title: "Informes",
          value: catalogItem?.conservation?.reports ?? undefined,
        },
        {
          title: "Notas",
          value: catalogItem?.conservation?.notes ?? undefined,
        },
        {
          title: "Resultados",
          value: catalogItem?.conservation?.results ?? undefined,
        },
      ],
    },
    {
      title: "Tratamiento",
      items: [
        {
          title: "Tipo de Tratamiento",
          value: catalogItem?.conservation?.treatmentType ?? undefined,
        },
        {
          title: "Descripción",
          value: catalogItem?.conservation?.description ?? undefined,
        },
        {
          title: "Condiciones Especiales",
          value: catalogItem?.conservation?.specialConditions ?? undefined,
        },
        {
          title: "Observaciones",
          value: catalogItem?.conservation?.observations ?? undefined,
        },
      ],
    },
  ];

  const datingData = [
    {
      title: "Fecha Simple",
      items: [
        {
          title: "Fecha Exacta",
          value: catalogItem?.dating?.simpleDate?.exact ?? undefined,
        },
        {
          title: "Fecha Aproximada",
          value: catalogItem?.dating?.simpleDate?.approximate ?? undefined,
        },
        {
          title: "Fecha Probable",
          value: catalogItem?.dating?.simpleDate?.probable ?? undefined,
        },
        {
          title: "Fecha antes de Cristo (AC)",
          value: catalogItem?.dating?.simpleDate?.bc?.toString() ?? undefined,
        },
        {
          title: "Año",
          value: catalogItem?.dating?.simpleDate?.year?.toString() ?? undefined,
        },
        {
          title: "Mes",
          value: catalogItem?.dating?.simpleDate?.month?.toString() ?? undefined,
        },
        {
          title: "Día",
          value: catalogItem?.dating?.simpleDate?.day?.toString() ?? undefined,
        }
      ],
    },
    {
      title: "Rango de Fechas",
      items: [
        {
          title: "Desde - Fecha Exacta",
          value: catalogItem?.dating?.dateRange?.from?.exact ?? undefined,
        },
        {
          title: "Desde - Fecha Aproximada",
          value: catalogItem?.dating?.dateRange?.from?.approximate ?? undefined,
        },
        {
          title: "Desde - Fecha Probable",
          value: catalogItem?.dating?.dateRange?.from?.probable ?? undefined,
        },
        {
          title: "Desde - Fecha antes de Cristo (AC)",
          value: catalogItem?.dating?.dateRange?.from?.bc?.toString() ?? undefined,
        },
        {
          title: "Desde - Año",
          value: catalogItem?.dating?.dateRange?.from?.year?.toString() ?? undefined,
        },
        {
          title: "Desde - Mes",
          value: catalogItem?.dating?.dateRange?.from?.month?.toString() ?? undefined,
        },
        {
          title: "Desde - Día",
          value: catalogItem?.dating?.dateRange?.from?.day?.toString() ?? undefined,
        },
        {
          title: "Hasta - Fecha Exacta",
          value: catalogItem?.dating?.dateRange?.to?.exact ?? undefined,
        },
        {
          title: "Hasta - Fecha Aproximada",
          value: catalogItem?.dating?.dateRange?.to?.approximate ?? undefined,
        },
        {
          title: "Hasta - Fecha Probable",
          value: catalogItem?.dating?.dateRange?.to?.probable ?? undefined,
        },
        {
          title: "Hasta - Fecha antes de Cristo (AC)",
          value: catalogItem?.dating?.dateRange?.to?.bc?.toString() ?? undefined,
        },
        {
          title: "Hasta - Año",
          value: catalogItem?.dating?.dateRange?.to?.year?.toString() ?? undefined,
        },
        {
          title: "Hasta - Mes",
          value: catalogItem?.dating?.dateRange?.to?.month?.toString() ?? undefined,
        },
        {
          title: "Hasta - Día",
          value: catalogItem?.dating?.dateRange?.to?.day?.toString() ?? undefined,
        }
      ],
    },
    {
      title: "Datación Aproximada",
      items: [
        {
          title: "Desde Siglo",
          value: catalogItem?.dating?.approximateDating?.fromCentury ?? undefined,
        },
        {
          title: "Hasta Siglo",
          value: catalogItem?.dating?.approximateDating?.toCentury ?? undefined,
        },
      ],
    },
    {
      title: "Notas",
      items: [
        {
          title: "Fecha Textual",
          value: catalogItem?.dating?.notes?.textualDate ?? undefined,
        },
        {
          title: "Notas de Fecha Inicial",
          value:
            catalogItem?.dating?.notes?.initialDateNotes ?? undefined,
        },
        {
          title: "Notas de Fecha Final",
          value:
            catalogItem?.dating?.notes?.finalDateNotes ?? undefined,
        },
        {
          title: "Observaciones",
          value: catalogItem?.dating?.notes?.observations ?? undefined,
        },
      ],
    }
  ];

  return (
    <section className="flex flex-col gap-4 p-4">
      <header className="sticky top-0 z-10 bg-base-100 flex items-center justify-between p-4 shadow-md">
        <nav className="flex items-center gap-2">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </button>
          <h1 className="text-xl font-bold">
            Detalles del expediente {record} - {tenantId?.split("_")[1]}
          </h1>
        </nav>
        {catalogItem?.graphicDocumentation?.imageUrls[0] && (
          <picture className="ml-4 w-36 h-36 flex-shrink-0 mr-8">
            <AutoCarousel
              className="w-36 h-36 flex-shrink-0 mr-8 object-cover rounded-md"
              images={catalogItem.graphicDocumentation.imageUrls}
              description="Vista previa de la documentación gráfica"
              interval={3000}
            />
          </picture>
        )}
      </header>

      <DetailCard title="Archivo Administrativo" panels={adminFile} />
      {catalogItem?.identification && (
        <DetailCard title="Identificación" panels={identification} />
      )}
      {catalogItem?.administrativeData && (
        <DetailCard title="Datos Administrativos" panels={administrativeData} />
      )}
      {catalogItem?.conservation && (
        <DetailCard title="Datos de Conservación" panels={conservationData} />
      )}
      {catalogItem?.graphicDocumentation && (
        <DetailCard
          title="Documentación Gráfica"
          panels={graphicDocumentation}
        />
      )}
      {catalogItem?.dating && (
        <DetailCard title="Datación" panels={datingData} />
      )}
    </section>
  );
}