import { useNavigate, useParams } from "react-router-dom";
import CatalogItemList, {
  type CatalogModel,
} from "../organinsms/CatalogItemList";
import { useEffect, useState } from "react";
import { getCatalogList } from "../../utils/connections";
import ReactPaginate from "react-paginate";
import { useListStore } from "../../Zustand/stores/ListStore";
import SearchInput from "../atoms/SearchInput";
import { catalogListFilterList } from "../../constants/CatalogListFilterList";
import EmptyList from "../atoms/EmptyList";

export interface CatalogResponse {
  items: CatalogModel[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export default function CatalogListPage() {
  const navigate = useNavigate();
  const { setRefreshFunction } = useListStore();
  const { tenantId, page } = useParams();
  const pageNumber = parseInt(page || "1", 10);
  const [catalogNumber, setCatalogNumber] = useState<number>(0);
  const [catalogList, setCatalogList] = useState<CatalogResponse>();
  const [searchText, setSearchText] = useState<string>();
  const [searchParam, setSearchParam] = useState<string>("expediente");

  const handleOnClick = () => navigate(`/${tenantId}/create/catalog`);

  useEffect(() => {
    const fetchData = async () => {
      let result;

      if (searchParam && searchText)
        result = await getCatalogList(
          pageNumber,
          4,
          tenantId || "",
          searchParam,
          searchText
        );
      else result = await getCatalogList(pageNumber, 4, tenantId || "");

      setCatalogList(result);
      setCatalogNumber(result.totalItems || 0);
      setRefreshFunction(fetchData);

      if (result?.items.length === 0 && pageNumber > 1)
        navigate(`/${tenantId}/catalog/${pageNumber - 1}`);
    };
    fetchData();
  }, [
    tenantId,
    page,
    pageNumber,
    searchParam,
    searchText,
    setRefreshFunction,
    navigate,
  ]);

  const goToPage = (e: { selected: number }) => {
    navigate(`/${tenantId}/catalog/${e.selected + 1}`);
  };

  if (!catalogList) return <></>;

  return (
    <section
      className={`grid p-8 gap-6 ${catalogList.items.length < 1 && "h-full"}`}
    >
      <header className="flex justify-between font-semibold">
        <h2 className="text-xl">Lista de Catálogos ({catalogNumber})</h2>
        <button className="btn btn-primary" onClick={handleOnClick}>
          Nuevo Catálogo
        </button>
      </header>
      {catalogList?.items.length > 0 ? (
        <>
          <SearchInput
            items={catalogListFilterList}
            onChangeSelect={setSearchParam}
            onChangeValue={setSearchText}
          />
          <CatalogItemList items={catalogList?.items || []} />
          <ReactPaginate
            className="flex gap-2 place-self-center"
            pageLinkClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
            pageClassName="rounded-md"
            activeLinkClassName="bg-primary text-white rounded-md"
            breakLabel="..."
            pageCount={catalogList?.totalPages || 1}
            onPageChange={goToPage}
            nextLabel=">"
            nextClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
            previousLabel="<"
            previousClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
          />
        </>
      ) : (
        <EmptyList
          title="No hay objetos catalogados"
          description="Tu coleccion de patrimonio cultural esta vacia"
        />
      )}
    </section>
  );
}
