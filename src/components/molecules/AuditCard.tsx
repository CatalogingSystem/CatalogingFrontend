import type { Audit, AuditData } from "../../models/Audit.model";
import { formatText } from "../../utils/separateWords";

interface Props {
  item: Audit;
}

interface ModifiedComponentProps {
  property: string;
  oldValue: string;
  newValue: string;
}

function ModifiedComponent({
  property,
  oldValue,
  newValue,
}: ModifiedComponentProps) {
  return (
    <p
      key={property}
      className="break-words break-all word-wrap overflow-wrap-break-word hyphens-auto max-w-full"
    >
      {formatText(property)} de:{" "}
      <span className="text-gris-calido font-semibold break-words">
        "{oldValue}"
      </span>{" "}
      a{" "}
      <span className="text-primary font-semibold break-words">
        "{newValue}"
      </span>
    </p>
  );
}

export default function AuditCard({ item }: Props) {
  const AuditOperationMap: (operation: string) => {
    label: string;
    color: string;
  } = (operation) => {
    switch (operation) {
      case "CREATE":
        return { label: "Creado", color: "bg-green-700" };
      case "UPDATE":
        return { label: "Editado", color: "bg-amber-700" };
      case "DELETE":
        return { label: "Eliminado", color: "bg-red-700" };
      default:
        return { label: operation, color: "bg-gray-500" };
    }
  };

  const operationStyle = AuditOperationMap(item.operation).color;
  const operationLabel = AuditOperationMap(item.operation).label;

  const getModifiedData = (newData: string, oldData: string) => {
    const newDataArray = JSON.parse(newData) as AuditData[];
    const oldDataArray = JSON.parse(oldData) as AuditData[];

    return (
      <>
        {newDataArray.map((newItem: AuditData) => {
          const oldItem = oldDataArray.find(
            (item: AuditData) => item.Property === newItem.Property
          );
          if (oldItem) {
            return getModifiedComponent(
              newItem.Property,
              oldItem.OldValue ? oldItem.OldValue.Value : "Sin Especificar",
              newItem.NewValue.Value
            );
          }
          return null;
        })}
      </>
    );
  };

  const getModifiedComponent = (
    property: string,
    oldValue: string,
    newValue: string
  ) => {
    return (
      <ModifiedComponent
        key={property}
        property={property}
        oldValue={oldValue}
        newValue={newValue}
      />
    );
  };

  return (
    <li className="card bg-base-100 shadow-md p-4 mb-2 w-full overflow-hidden">
      <header className="flex justify-between items-center font-semibold text-lg mb-4 flex-wrap">
        <h3 className="break-words break-all max-w-full">{item.username}</h3>
        <p className="break-words break-all max-w-full">
          {new Date(item.actionTimestamp).toLocaleString()}
        </p>
      </header>
      <div className="grid grid-cols-12 gap-8 items-center mb-4">
        <p
          className={`col-span-1 text-white font-semibold text-center ${operationStyle}`}
        >
          {operationLabel}
        </p>
        <p
          className={`col-span-10 break-words break-all word-wrap overflow-wrap-break-word`}
        >
          {formatText(item.tableName)}
        </p>
      </div>
      {item.operation === "UPDATE" && (
        <div className="break-words break-all word-wrap overflow-wrap-break-word">
          <p className="font-semibold">Se ha modificado:</p>
          {getModifiedData(item.newData, item.oldData)}
        </div>
      )}
    </li>
  );
}
