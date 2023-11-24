import { SortType } from "@/types/common";
import { useSearchParams } from "react-router-dom";

const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sp = searchParams.get("sp") || "";

  function setFilterParams(name: string, value: Array<string | number>) {
    searchParams.set(name, value.join(","));
    if (value.length === 0) searchParams.delete(name);
    setSearchParams(searchParams);
  }

  function handlePageChange(page: number) {
    if (page !== 1) {
      setFilterParams("page", [page]);
    } else {
      searchParams.delete("page");
      setSearchParams(searchParams);
    }
  }
  function handleSearchChange(search: string) {
    if (search?.length) {
      setFilterParams("search", [search]);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }

  function handleSortChange(sort: [string, SortType]) {
    if (sort?.length) {
      setFilterParams("sp", sort);
    } else {
      searchParams.delete("sp");
      setSearchParams(searchParams);
    }
  }
  function getSortOrder() {
    const sp = searchParams.get("sp");
    if (sp) {
      const [field, order] = sp.split(",");
      return { field, order };
    }
    return { field: "", order: "" };
  }

  return {
    setFilterParams,
    page,
    handlePageChange,
    search,
    handleSearchChange,
    sp,
    handleSortChange,
    getSortOrder,
    limit,
  };
};

export type setPaginationParamsType = ReturnType<typeof useFilterParams>;

export default useFilterParams;
