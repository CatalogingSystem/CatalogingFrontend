import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import PaginatedListTemplate from "../templates/PaginatedListTemplate";
import {
  getTemporalMovements,
  removeTemporalMovement,
} from "../../utils/connections";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import type { TemporalMovementResponse } from "../../models/TemporalMovement/TemporalMovement.model";
import { formatText } from "../../utils/separateWords";
import ConfirmModal from "../atoms/ConfirmModal";

export default function TemporalMovements() {
  const { record, tenantId } = useParams();
  const { jwt } = useAuthStore();
  const navigate = useNavigate();

  const [temporalMovements, setTemporalMovements] = useState<
    TemporalMovementResponse[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<
    string | null
  >(null);

  const confirmRemove = async () => {
    if (selectedItemToDelete === null || !tenantId) return;
    setTemporalMovements(
      temporalMovements.filter((item) => item.id !== selectedItemToDelete)
    );
    await removeTemporalMovement(selectedItemToDelete, tenantId, jwt);
    setSelectedItemToDelete(null);
    fetchData();
  };

  const fetchData = useCallback(async () => {
    if (!record || !tenantId || !jwt) return;

    const data = await getTemporalMovements(Number(record), tenantId, jwt);

    setTemporalMovements(data.items);
    setTotalItems(data.totalItems);
  }, [jwt, record, tenantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <PaginatedListTemplate
        title="Movimientos temporales"
        showSearch={false}
        canAudit={true}
        onAudit={() => {
          navigate(`/${tenantId}/audit/temporal-movements/${record}`);
        }}
        renderItem={(movement: TemporalMovementResponse) => (
          <div
            className="flex flex-col card bg-base-100 shadow-md p-4 mb-2 w-full gap-4 relative hover:cursor-pointer"
            key={movement.id}
          >
            <header>
              <button
                type="button"
                className="btn btn-ghost absolute right-20 top-4"
                onClick={() => {
                  setSelectedItemToDelete(movement.id);
                }}
              >
                <DeleteIcon />
              </button>
              <button
                type="button"
                className="btn btn-ghost absolute right-4 top-4"
                onClick={() => {
                  navigate(
                    `/${tenantId}/update/temporal-movements/${record}/${movement.id}`
                  );
                }}
              >
                <EditIcon />
              </button>
            </header>
            <div
              onClick={() => {
                navigate(
                  `/${tenantId}/detail/temporal-movements/${movement.id}`
                );
              }}
            >
              <div className="grid grid-cols-2 gap-4 cursor-pointer">
                <p>
                  <strong>Aplicante:</strong> {movement.applicant.firstName}{" "}
                  {movement.applicant.lastName}
                </p>
                <p>
                  <strong>Tipo de movimiento:</strong>{" "}
                  {formatText(movement.movementType)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Locacion de Transferencia:</strong>{" "}
                  {movement.transferLocation}
                </p>
                <p>
                  <strong>Fecha de salida:</strong>{" "}
                  {new Date(movement.departureDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
        items={temporalMovements}
        totalItems={totalItems}
        isEmpty={temporalMovements.length === 0}
        onCreate={() => {
          navigate(`/${tenantId}/create/temporal-movements/${record}`);
        }}
      />
      <ConfirmModal
        isOpen={selectedItemToDelete !== null}
        title="Eliminar expediente"
        message={`¿Estás seguro de que quieres eliminar el movimiento?`}
        onCancel={() => setSelectedItemToDelete(null)}
        onConfirm={confirmRemove}
      />
    </>
  );
}
