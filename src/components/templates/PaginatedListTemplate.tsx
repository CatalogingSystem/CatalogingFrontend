import React from "react";
import ReactPaginate from "react-paginate";
import SearchInput from "../atoms/SearchInput";
import EmptyList from "../atoms/EmptyList";

interface PaginatedListTemplateProps<T> {
  title: string;
  totalItems: number;
  items: T[];
  isEmpty?: boolean;
  canCreate?: boolean;
  onCreate?: () => void;
  canBeImported?: boolean;
  onImport?: () => void;
  canAudit?: boolean;
  onAudit?: () => void;
  renderItem?: (item: T, index: number) => React.ReactNode;
  pageCount?: number;
  onPageChange?: ({ selected }: { selected: number }) => void;
  showSearch?: boolean;
  searchItems?: { label: string; value: string }[];
  onSearchParamChange?: (param: string) => void;
  onSearchTextChange?: (text: string) => void;
  children?: React.ReactNode;
}

export default function PaginatedListTemplate<T>({
  title,
  totalItems,
  items,
  isEmpty = false,
  canCreate = true,
  onCreate,
  canBeImported = false,
  onImport,
  canAudit = false,
  onAudit,
  renderItem,
  pageCount,
  onPageChange,
  showSearch = false,
  searchItems = [],
  onSearchParamChange,
  onSearchTextChange,
  children,
}: PaginatedListTemplateProps<T>) {
  return (
    <section className={`grid p-8 gap-6 ${isEmpty ? "h-full" : ""}`}>
      <header className="flex justify-between font-semibold">
        <h2 className="text-xl">{`${title} (${totalItems})`}</h2>
        <div>
          {canBeImported && onImport && (
            <button className="btn btn-secondary mr-2" onClick={onImport}>
              Importar
            </button>
          )}
          {canCreate && onCreate && (
            <button className="btn btn-primary" onClick={onCreate}>
              Crear
            </button>
          )}
          {canAudit && onAudit && (
            <button className="btn btn-secondary ml-2" onClick={onAudit}>
              Auditoría
            </button>
          )}
        </div>
      </header>

      {!isEmpty ? (
        <>
          {showSearch && (
            <SearchInput
              items={searchItems}
              onChangeSelect={onSearchParamChange}
              onChangeValue={onSearchTextChange}
            />
          )}

          {children ? (
            children
          ) : (
            <div className="flex flex-col gap-4">{items.map(renderItem)}</div>
          )}

          {pageCount && onPageChange && (
            <ReactPaginate
              className="flex gap-2 place-self-center"
              pageLinkClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
              pageClassName="rounded-md"
              activeLinkClassName="bg-primary text-white rounded-md"
              breakLabel="..."
              pageCount={pageCount}
              onPageChange={onPageChange}
              nextLabel=">"
              nextClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
              previousLabel="<"
              previousClassName="px-2 hover:cursor-pointer hover:rounded-md hover:bg-primary hover:text-white"
            />
          )}
        </>
      ) : (
        <EmptyList
          title="No hay resultados"
          description="No se encontraron elementos"
        />
      )}
    </section>
  );
}
