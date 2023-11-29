import { SortType } from "@/types/common";
import { useSearchParams } from "react-router-dom";

const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sp = searchParams.get("sp") || "";
  const group = searchParams.get("group") || "";
  const designation = searchParams.get("designation") || "";

  function setFilterParams(name: string, value: Array<string | number>) {
    console.log(value);
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

  function handleGroupChange(group: string[]) {
    if (group?.length) {
      setFilterParams("group", group);
    } else {
      searchParams.delete("group");
      setSearchParams(searchParams);
    }
  }

  function handleDesignationChange(designation: string[]) {
    if (designation?.length) {
      setFilterParams("designation", designation);
    } else {
      searchParams.delete("designation");
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

  function getSearchParams() {
    return {
      page,
      limit,
      search,
      sp,
      group,
      designation,
    };
  }

  return {
    setFilterParams,
    handlePageChange,
    handleSearchChange,
    handleGroupChange,
    handleDesignationChange,
    getSearchParams,
    handleSortChange,
    getSortOrder,
  };
};

export type setFilterParamsType = ReturnType<typeof useFilterParams>;

export default useFilterParams;
