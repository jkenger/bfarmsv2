import { Button } from "./button";
import useFilterParams, { getSearchParams } from "../hooks/useFilterParams";

function DataTablePaginationNoBtn({ numOfPages = 0 }: { numOfPages?: number }) {
  const { setFilterParams } = useFilterParams();
  const { page } = getSearchParams();
  const currentPage = Number(page);
  // Should not be reil

  function handlePageChange(page: number) {
    setFilterParams("page", [page]);
  }

  // page buttons to render
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          handlePageChange(
            currentPage === 1 || currentPage < 1 ? 1 : currentPage - 1
          )
        }
        disabled={currentPage === 1 || currentPage < 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === numOfPages || currentPage === numOfPages + 1}
      >
        Next
      </Button>
    </div>
  );
}

export default DataTablePaginationNoBtn;
