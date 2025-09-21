import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import CatalogItemList, {
  type CatalogModel,
} from "../organinsms/CatalogItemList";
import { getCatalogList } from "../../utils/connections";
import { useListStore } from "../../Zustand/stores/ListStore";
import { catalogListFilterList } from "../../constants/CatalogListFilterList";
import { useAuthStore } from "../../Zustand/stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import PaginatedListTemplate from "../templates/PaginatedListTemplate";
import DialogTemplate from "../templates/DialogTemplate";
import { useDialogStore } from "../../Zustand/stores/DialogStore";
import ImportForm from "../organinsms/ImportForm";
import RecordConflictForm from "../organinsms/RecordConflictForm";

export interface CatalogResponse {
  items: CatalogModel[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export default function CatalogListPage() {
  const navigate = useNavigate();
  const { tenantId = "", page = "1" } = useParams();
  const pageNumber = parseInt(page, 10);
  const { jwt } = useAuthStore();

  const { setRefreshFunction } = useListStore();
  const { setDialogStatus } = useDialogStore();

  const [catalogData, setCatalogData] = useState<CatalogResponse>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("expediente");
  const [isSearching, setIsSearching] = useState(false);

  const fetchCatalogs = useCallback(async () => {
    const isSearchMode = Boolean(searchParam && searchText);

    setIsSearching(isSearchMode);

    const result = await getCatalogList(
      pageNumber,
      4,
      tenantId,
      jwt,
      searchParam,
      searchText
    );
    setCatalogData(result);
    setRefreshFunction(fetchCatalogs);

    if (result?.items.length === 0 && pageNumber > 1) {
      navigate(`/${tenantId}/catalog/${pageNumber - 1}`);
    }
  }, [
    searchParam,
    searchText,
    pageNumber,
    tenantId,
    jwt,
    setRefreshFunction,
    navigate,
  ]);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  const handleCreateCatalog = () => {
    navigate(`/${tenantId}/create/catalog`);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    navigate(`/${tenantId}/catalog/${selected + 1}`);
  };

  if (!catalogData) return null;

  const { items, totalItems, totalPages } = catalogData;
  const isEmpty = items.length === 0 && !isSearching;

  return (
    <>
      <PaginatedListTemplate
        title="Lista de Catálogos"
        totalItems={totalItems}
        items={items}
        isEmpty={isEmpty}
        canCreate={jwtDecode(jwt).PermissionLevel !== "ReadOnly"}
        onCreate={handleCreateCatalog}
        canBeImported={jwtDecode(jwt).PermissionLevel !== "ReadOnly"}
        onImport={() => setDialogStatus("catalogImportDialog", true)}
        renderItem={(item) => <CatalogItemList key={item.id} items={[item]} />}
        pageCount={totalPages}
        onPageChange={handlePageChange}
        showSearch
        searchItems={catalogListFilterList}
        onSearchParamChange={setSearchParam}
        onSearchTextChange={setSearchText}
      />
      <DialogTemplate
        onClose={() => setDialogStatus("catalogImportDialog", false)}
        dialogId="catalogImportDialog"
      >
        <ImportForm />
      </DialogTemplate>
      <DialogTemplate
        onClose={() => setDialogStatus("recordConflictDialog", false)}
        dialogId="recordConflictDialog"
      >
        <RecordConflictForm />
      </DialogTemplate>
    </>
  );
}
