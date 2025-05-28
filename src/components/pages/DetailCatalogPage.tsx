import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useCallback, useEffect, useState } from "react";
import { getCatalogItemByRecord } from "../../utils/connections";
import DetailCard from "../organinsms/DetailCard";
import type { CatalogModel } from "../organinsms/CatalogItemList";
import { formatText } from "../../utils/separateWords";

export default function DetailCatalogPage() {
  const { id, tenantId } = useParams();
  const record = parseInt(id || "1");
  const [catalogItem, setCatalogItem] = useState<CatalogModel>();

  const fetchData = useCallback(async () => {
    if (!tenantId) return;

    const res = await getCatalogItemByRecord(record, tenantId);
    setCatalogItem(res.items[0]);
  }, [record, tenantId]);

  useEffect(() => {
    fetchData();
  });

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
          value: catalogItem?.archivoAdministrativo.unidad,
        },
        {
          title: "Expediente",
          value: catalogItem?.expediente,
        },
        {
          title: "Serie",
          value: catalogItem?.archivoAdministrativo.serie,
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
          value: catalogItem?.identification.inventory,
        },
        {
          title: "Número de Objetos",
          value: catalogItem?.identification.numberOfObjects,
        },
        {
          title: "Clasificación Genérica",
          value: catalogItem?.identification.genericClassification,
        },
        {
          title: "Nombre del Objeto",
          value: catalogItem?.identification.objectName,
        },
      ],
    },
    {
      title: "Seccion",
      items: [
        { title: "Sala", value: catalogItem?.identification.section.room },
        { title: "Panel", value: catalogItem?.identification.section.panel },
        {
          title: "Vitrina",
          value: catalogItem?.identification.section.displayCase,
        },
        {
          title: "Caballete",
          value: catalogItem?.identification.section.easel,
        },
        {
          title: "Depósito",
          value: catalogItem?.identification.section.storage,
        },
        {
          title: "Patio",
          value: catalogItem?.identification.section.courtyard,
        },
        { title: "Pilar", value: catalogItem?.identification.section.pillar },
        { title: "Otros", value: catalogItem?.identification.section.others },
      ],
    },
    {
      title: "Tipología",
      items: [
        { title: "Tipo", value: catalogItem?.identification.typology.type },
        {
          title: "Subtipo",
          value: catalogItem?.identification.typology.subtype,
        },
        { title: "Clase", value: catalogItem?.identification.typology.class },
        {
          title: "Subclase",
          value: catalogItem?.identification.typology.subclass,
        },
        { title: "Orden", value: catalogItem?.identification.typology.order },
        {
          title: "Suborden",
          value: catalogItem?.identification.typology.suborder,
        },
      ],
    },
    {
      title: "Nombre Específico",
      items: [
        {
          title: "Nombre Genérico",
          value: catalogItem?.identification.specificName.genericName,
        },
        {
          title: "Términos Relacionados",
          value: catalogItem?.identification.specificName.relatedTerms,
        },
        {
          title: "Términos Específicos",
          value: catalogItem?.identification.specificName.specificTerms,
        },
        {
          title: "Usado Por",
          value: catalogItem?.identification.specificName.usedBy,
        },
        {
          title: "Notas",
          value: catalogItem?.identification.specificName.notes,
        },
      ],
    },
    {
      title: "Autor",
      items: [
        { title: "Nombre", value: catalogItem?.identification.author.name },
        {
          title: "Lugar de Nacimiento",
          value: catalogItem?.identification.author.birthPlace,
        },
        {
          title: "Fecha de Nacimiento",
          value: formatDate(catalogItem?.identification.author.birthDate),
        },
        {
          title: "Lugar de Fallecimiento",
          value: catalogItem?.identification.author.deathPlace,
        },
        {
          title: "Fecha de Fallecimiento",
          value: formatDate(catalogItem?.identification.author.deathDate),
        },
      ],
    },
    {
      title: "Título",
      items: [
        { title: "Titulo", value: catalogItem?.identification.title.name },
        {
          title: "Atribución",
          value: catalogItem?.identification.title.attribution,
        },
        {
          title: "Traducción",
          value: catalogItem?.identification.title.translation,
        },
      ],
    },
    {
      title: "Material",
      items: [
        {
          title: "Nombre del Material",
          value: catalogItem?.identification.material.materialName,
        },
        {
          title: "Parte Descrita",
          value: catalogItem?.identification.material.describedPart,
        },
        {
          title: "Colores",
          value: catalogItem?.identification.material.colors,
        },
      ],
    },
    {
      title: "Técnicas",
      items: [
        {
          title: "Nombre de la Técnica",
          value: catalogItem?.identification.techniques.techniqueName,
        },
        {
          title: "Parte Descrita",
          value: catalogItem?.identification.techniques.describedPart,
        },
      ],
    },
    {
      title: "Observaciones",
      items: [
        {
          title: "Observaciones Generales",
          value: catalogItem?.identification.observations,
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
          value: catalogItem?.graphicDocumentation.expediente,
        },
        {
          title: "Inventario",
          value: catalogItem?.identification.inventory,
        },
        {
          title: "Descripción",
          value: catalogItem?.graphicDocumentation.description,
        },
        {
          title: "Datos Técnicos",
          value: catalogItem?.graphicDocumentation.technicalData,
        },
      ],
    },
    {
      title: "Información Específica",
      items: [
        {
          title: "Número Genérico",
          value: catalogItem?.graphicDocumentation.genericControlNumber,
        },
        {
          title: "Número Específico",
          value: catalogItem?.graphicDocumentation.specificControlNumber,
        },
        {
          title: "Fecha",
          value: catalogItem?.graphicDocumentation.date,
        },
        {
          title: "Ancho",
          value: catalogItem?.graphicDocumentation.dimensions.width,
        },
        {
          title: "Alto",
          value: catalogItem?.graphicDocumentation.dimensions.height,
        },
      ],
    },
    {
      title: "Autor Imagen",
      items: [
        {
          title: "Nombre",
          value: catalogItem?.graphicDocumentation.imageAuthor.firstName,
        },
        {
          title: "Apellido",
          value: catalogItem?.graphicDocumentation.imageAuthor.lastName,
        },
        {
          title: "Cédula de Identidad",
          value: catalogItem?.graphicDocumentation.imageAuthor.identityCard,
        },
      ],
    },
    {
      title: "Identificación Institucional",
      items: [
        {
          title: "Institución",
          value: catalogItem?.graphicDocumentation.imageAuthor.institution,
        },
        {
          title: "Dirección / Calle / Número",
          value: catalogItem?.graphicDocumentation.imageAuthor.address,
        },
        {
          title: "Localidad",
          value: catalogItem?.graphicDocumentation.imageAuthor.locality,
        },
        {
          title: "Provincia",
          value: catalogItem?.graphicDocumentation.imageAuthor.province,
        },
        {
          title: "Departamento",
          value: catalogItem?.graphicDocumentation.imageAuthor.department,
        },
        {
          title: "País",
          value: catalogItem?.graphicDocumentation.imageAuthor.country,
        },
        {
          title: "Número de Teléfono",
          value: catalogItem?.graphicDocumentation.imageAuthor.phoneNumber,
        },
        {
          title: "Email",
          value: catalogItem?.graphicDocumentation.imageAuthor.email,
        },
        {
          title: "Referencias",
          value: catalogItem?.graphicDocumentation.imageAuthor.references,
        },
      ],
    },
    {
      title: "Observaciones",
      items: [
        {
          title: "Observaciones Generales",
          value: catalogItem?.graphicDocumentation.generalObservations,
        },
      ],
    },
  ];

  return (
    <section className="flex flex-col gap-4 p-4">
      <header className="sticky top-0 z-10 bg-base-100 flex items-center justify-between p-4 shadow-md">
        <h1 className="text-xl font-bold">
          Detalles del expediente {record} - {tenantId?.split("_")[1]}
        </h1>
        {catalogItem?.graphicDocumentation?.imageUrls[0] && (
          <picture className="ml-4 w-36 h-36 flex-shrink-0 mr-8">
            <img
              src={catalogItem.graphicDocumentation.imageUrls[0]}
              alt="Vista previa"
              className="object-cover w-full h-full rounded"
            />
          </picture>
        )}
      </header>

      <DetailCard title="Archivo Administrativo" panels={adminFile} />
      <DetailCard title="Identificación" panels={identification} />
      <DetailCard title="Documentación Gráfica" panels={graphicDocumentation} />
    </section>
  );
}
