export interface CatalogModel {
  expediente: number;
  archivoAdministrativo: ArchivoAdministrativo;
  identification?: Identification;
  graphicDocumentation?: GraphicDocumentation;
}

export interface ArchivoAdministrativo {
  institucion: string;
  unidad: string;
  expediente: number;
  serie: string;
  documentoOrigen: string;
  fechaInicial: string;
  fechaFinal?: string;
  expedienteAnterior: string;
  asunto: string;
  peticionTransferencia: boolean;
  historial: string;
  archivoDocumental: string;
  observaciones: string;
}

export interface Identification {
  section: Section;
  inventory: number;
  numberOfObjects: number;
  genericClassification: string;
  objectName: string;
  typology: Typology;
  specificName: SpecificName;
  author: Author;
  title: Title;
  material: Material;
  techniques: Techniques;
  observations: string;
  expediente: number;
  unit: string;
}

export interface Section {
  room: string;
  panel: string;
  displayCase: string;
  easel: string;
  storage: string;
  courtyard: any;
  pillar: string;
  others: string;
}

export interface Typology {
  type: string;
  subtype: string;
  class: string;
  subclass: string;
  order: string;
  suborder: string;
}

export interface SpecificName {
  genericName: string;
  relatedTerms: string;
  specificTerms: string;
  usedBy: string;
  notes: string;
}

export interface Author {
  name: string;
  birthPlace: string;
  birthDate: string;
  deathPlace: string;
  deathDate: string;
}

export interface Title {
  name: string;
  attribution: string;
  translation: string;
}

export interface Material {
  describedPart: string;
  materialName: string;
  colors: string;
}

export interface Techniques {
  describedPart: string;
  techniqueName: string;
}

export interface GraphicDocumentation {
  expediente: number;
  genericControlNumber: string;
  specificControlNumber: string;
  date: any;
  supportTypes: any[];
  dimensions: Dimensions;
  imageAuthor: ImageAuthor;
  description: string;
  technicalData: string;
  generalObservations: string;
  imageUrls: string[];
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface ImageAuthor {
  firstName: string;
  lastName: string;
  identityCard: string;
  institutionalId: string;
  institution: string;
  address: string;
  locality: string;
  province: string;
  department: string;
  country: string;
  phoneNumber: string;
  email: string;
  references: string;
}

interface Props {
  items: CatalogModel[];
}
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { formatText } from "../../utils/separateWords";
import { removeCatalogItem } from "../../utils/connections";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useListStore } from "../../Zustand/stores/ListStore";
import ConfirmModal from "../atoms/ConfirmModal";

export default function CatalogItemList({ items }: Props) {
  const { tenantId } = useParams();
  const [itemsList, setItemsList] = useState<CatalogModel[]>([]);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    number | null
  >(null);
  const { refreshFunction: refreshValue } = useListStore();

  const confirmRemove = async () => {
    if (selectedItemToDelete === null) return;

    setItemsList(
      itemsList.filter((item) => item.expediente !== selectedItemToDelete)
    );
    await removeCatalogItem(selectedItemToDelete, tenantId || "");
    refreshValue();
    setSelectedItemToDelete(null);
  };

  useEffect(() => {
    const fillData = () => setItemsList(items);
    fillData();
  }, [items]);

  return (
    <>
      <ul className="flex flex-col gap-2 p-2">
        {itemsList.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-6 rounded-md bg-base-100 p-4"
          >
            <div className="w-64 h-64 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <img
                className="w-full h-full object-cover"
                src={item.graphicDocumentation?.imageUrls[0]}
                alt={item.graphicDocumentation?.description || "Imagen"}
              />
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-500">Expediente</p>
                <p>{item.expediente}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Nombre del Objeto</p>
                <p>{item.identification?.objectName || "Sin especificar"}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Unidad</p>
                <p>{item.archivoAdministrativo.unidad}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">
                  Clasificación Genérica
                </p>
                <p>
                  {item.identification?.genericClassification ||
                    "Sin especificar"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">
                  Documento de Origen
                </p>
                <p>{formatText(item.archivoAdministrativo.documentoOrigen)}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Tipología</p>
                <p>
                  {item.identification?.typology?.type || "Sin especificar"}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <button className="btn btn-square btn-ghost">
                <EditIcon />
              </button>
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setSelectedItemToDelete(item.expediente)}
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={selectedItemToDelete !== null}
        title="Eliminar expediente"
        message={`¿Estás seguro de que quieres eliminar el expediente ${selectedItemToDelete}?`}
        onCancel={() => setSelectedItemToDelete(null)}
        onConfirm={confirmRemove}
      />
    </>
  );
}
