import type { Audit } from "../../models/Audit.model";
import AuditCard from "../molecules/AuditCard";

interface Props {
  items: Audit[];
}

export default function AuditList({ items }: Props) {
  return (
    <ul className="w-full max-w-full">
      {items.map((item, index) => (
        <AuditCard key={index} item={item} />
      ))}
    </ul>
  );
}
