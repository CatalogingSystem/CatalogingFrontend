interface Props {
  items: CatalogModel[];
}
import DeleteIcon from "@mui/icons-material/Delete";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EditIcon from "@mui/icons-material/Edit";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { formatText } from "../../utils/separateWords";
import { exportCatalog, removeCatalogItem } from "../../utils/connections";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useListStore } from "../../Zustand/stores/ListStore";
import ConfirmModal from "../atoms/ConfirmModal";
import AutoCarousel from "../atoms/AutoCarousel";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import type { CatalogModel } from "../../models/Catalog.model";

export default function CatalogItemList({ items }: Props) {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const { jwt } = useAuthStore();
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
    await removeCatalogItem(selectedItemToDelete, tenantId || "", jwt);
    refreshValue();
    setSelectedItemToDelete(null);
  };

  const handleEditItem = (record: number) => {
    navigate(`/${tenantId}/edit/catalog/${record}`);
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
            <div
              className="flex-1 flex gap-4 cursor-pointer"
              onClick={() =>
                navigate(`/${tenantId}/detail/catalog/${item.expediente}`)
              }
            >
              {" "}
              <div className="w-64 h-64 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {!item.graphicDocumentation ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    alt="No data field"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <AutoCarousel
                    images={item.graphicDocumentation.imageUrls}
                    description={
                      item.graphicDocumentation.description ||
                      "Imagen del catálogo"
                    }
                    className="w-full h-full object-cover"
                    interval={3000}
                  />
                )}
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4 text-sm cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-500">Expediente</p>
                  <p>{item.expediente}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">
                    Nombre del Objeto
                  </p>
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
                  <p>
                    {formatText(item.archivoAdministrativo.documentoOrigen)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Tipología</p>
                  <p>
                    {item.identification?.typology?.type || "Sin especificar"}
                  </p>
                </div>
              </div>{" "}
            </div>
            {jwtDecode(jwt).PermissionLevel &&
            jwtDecode(jwt).PermissionLevel === "ReadOnly" ? (
              <div></div>
            ) : (
              <div className="flex-shrink-0">
                <button
                  className="btn btn-square btn-ghost"
                  onClick={async () => {
                    if (!tenantId) return;
                    const res = await exportCatalog(
                      item.expediente,
                      tenantId,
                      jwt
                    );
                    const blob = new Blob([JSON.stringify(res)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `catalog_${item.expediente}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <FileDownloadIcon />
                </button>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() =>
                    navigate(
                      `/${tenantId}/temporal-movements/${item.expediente}/1`
                    )
                  }
                >
                  <PendingActionsIcon />
                </button>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() =>
                    navigate(`/${tenantId}/audit/catalog/${item.expediente}`)
                  }
                >
                  <ManageSearchOutlinedIcon />
                </button>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => handleEditItem(item.expediente)}
                >
                  <EditIcon />
                </button>
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => setSelectedItemToDelete(item.expediente)}
                >
                  <DeleteIcon />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={selectedItemToDelete !== null}
        title="Eliminar expediente"
        message={`¿Estás seguro de que quieres eliminar el expediente ${selectedItemToDelete}? Se eliminarán todos los movimientos temporales asociados`}
        onCancel={() => setSelectedItemToDelete(null)}
        onConfirm={confirmRemove}
      />
    </>
  );
}
