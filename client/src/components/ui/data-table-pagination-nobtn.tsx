import { Button } from "./button";

import { Input } from "./input";
import debounce from "debounce";
import { useEffect, useRef } from "react";

function DataTablePaginationNoBtn({
  numOfPages = 0,
  pageChange,
}: {
  numOfPages?: number;
  pageChange: {
    page: string;
    handlePageChange: (page: number) => void;
  };
}) {
  const page = pageChange.page;
  const handlePageChange = pageChange.handlePageChange;
  const currentPage = Number(page);
  const pageInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (pageInputRef.current)
      pageInputRef.current.value = currentPage.toString();
  }, [currentPage]);

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
      <Input
        className="w-12"
        defaultValue={currentPage}
        ref={pageInputRef}
        onChange={debounce((e) => {
          if (Number(e.target.value) > numOfPages) handlePageChange(numOfPages);
          if (Number(e.target.value) < 1) handlePageChange(1);
          if (
            Number(e.target.value) >= 1 &&
            Number(e.target.value) <= numOfPages
          )
            handlePageChange(Number(e.target.value));
        }, 500)}
      />
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
