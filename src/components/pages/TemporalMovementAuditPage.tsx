import { useCallback, useEffect, useState } from "react";
import { getAuditRecords } from "../../utils/connections";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import PaginatedListTemplate from "../templates/PaginatedListTemplate";
import AuditList from "../organinsms/AuditList";
import type { Audit } from "../../models/Audit.model";

export default function TemporalMovementAuditPage() {
  const { tenantId, record } = useParams<{
    tenantId: string;
    record: string;
  }>();
  const { jwt } = useAuthStore();
  const [auditRecords, setAuditRecords] = useState<Audit[]>([]);
  const [totalAuditRecords, setTotalAuditRecords] = useState<number>(0);

  const fetchAuditRecords = useCallback(async () => {
    if (!tenantId || !record) return;

    const data = await getAuditRecords(
      tenantId,
      jwt,
      record,
      1,
      10,
      "TemporalMovement"
    );
    setAuditRecords(data.items);
    setTotalAuditRecords(data.totalItems);
  }, [jwt, record, tenantId]);

  useEffect(() => {
    fetchAuditRecords();
  }, [fetchAuditRecords]);

  return (
    <PaginatedListTemplate
      title={`Historial del Expediente ${record}`}
      totalItems={totalAuditRecords}
      items={auditRecords}
    >
      <AuditList items={auditRecords} />
    </PaginatedListTemplate>
  );
}
