import { Button } from "./button";
import usePaginationParams, { getSearchParams } from "../hooks/useFilterParams";
import { useIsFetching } from "@tanstack/react-query";

function DataTablePagination({ numOfPages = 0 }: { numOfPages?: number }) {
  const { handlePageChange } = usePaginationParams();
  const { page } = getSearchParams();
  const currentPage = Number(page);
  const isFetching = useIsFetching();
  // Should not be reil

  function addPageButton({ page }: { page: number }) {
    return (
      <Button
        key={page}
        variant="outline"
        size="sm"
        className={`${
          !isFetching && currentPage === page ? "bg-primary text-white" : ""
        }`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  }

  function renderPageButton() {
    // page buttons to render
    const pageButtons = [];

    // first page button
    pageButtons.push(addPageButton({ page: 1 }));

    if (currentPage > 3) {
      pageButtons.push(
        <Button
          key={currentPage - 2}
          onClick={() => handlePageChange(currentPage - 2)}
          size="icon"
          variant="outline"
        >
          ...
        </Button>
      );
    }

    // before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ page: currentPage - 1 }));
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton({ page: currentPage }));
    }

    // after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(addPageButton({ page: currentPage + 1 }));
    }

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <Button
          key={currentPage + 2}
          onClick={() => handlePageChange(currentPage + 2)}
          size="icon"
          variant="outline"
        >
          ...
        </Button>
      );
    }
    // last page
    if (numOfPages > 1) {
      pageButtons.push(addPageButton({ page: numOfPages }));
    }
    return pageButtons;
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
      {renderPageButton()}
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

export default DataTablePagination;
