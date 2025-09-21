import { useCallback, useEffect, useState } from "react";
import { getTenants } from "../../utils/connections";
import TenantList from "../organinsms/TenantList";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import PaginatedListTemplate from "../templates/PaginatedListTemplate";

export default function TenantListPage() {
  const navigate = useNavigate();
  const { jwt } = useAuthStore();
  const { page } = useParams();

  const [tenantList, setTenantList] = useState([]);
  const [totalTenants, setTotalTenants] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleCreateTenant = () => navigate("/create/institution");

  const handlePageChange = (selected: { selected: number }) => {
    navigate(`/list/institution/${selected.selected + 1}`);
  };

  const fetchData = useCallback(async () => {
    const data = await getTenants(jwt, page ? Number(page) : 1, 4);
    setTenantList(data.items || []);
    setTotalTenants(data.totalItems || 0);
    setTotalPages(data.totalPages || 0);
  }, [jwt, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PaginatedListTemplate
      title="Lista de instituciones"
      totalItems={totalTenants}
      items={tenantList}
      isEmpty={tenantList.length === 0}
      onCreate={handleCreateTenant}
      renderItem={(item, index) => <TenantList key={index} items={[item]} />}
      pageCount={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
