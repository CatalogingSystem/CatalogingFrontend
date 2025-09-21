export interface AuditData {
  Property: string;
  OldValue: {
    Type: string;
    Value: string;
  };
  NewValue: {
    Type: string;
    Value: string;
  };
}

export interface Audit {
  id: string;
  tableName: string;
  operation: string;
  recordId: string;
  expediente: number;
  oldData: string;
  newData: string;
  userId: string;
  username: string;
  tenantId: string;
  actionTimestamp: Date;
  context: string;
}

export interface AuditResponse {
  items: Audit[];
  totalItems: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}
