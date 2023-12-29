import { SortType } from "@/types/common";
import { useSearchParams } from "react-router-dom";

const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const page = Number(searchParams.get("page")) || 1;
  // const limit = Number(searchParams.get("limit")) || 10;
  // const search = searchParams.get("search") || "";
  // const sp = searchParams.get("sp") || "";
  // const group = searchParams.get("group") || "";
  // const designation = searchParams.get("designation") || "";

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

  function handleGroupChange(group: string[]) {
    if (group?.length) {
      setFilterParams("payrollGroup", group);
    } else {
      searchParams.delete("payrollGroup");
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

  function handleTravelTypeChange(travelType: string[]) {
    if (travelType?.length) {
      setFilterParams("travelType", travelType);
    } else {
      searchParams.delete("travelType");
      setSearchParams(searchParams);
    }
  }

  function handlePageLimit(limit: number) {
    if (limit !== 10) {
      setFilterParams("limit", [limit]);
    } else {
      searchParams.delete("limit");
      setSearchParams(searchParams);
    }
  }

  function handleFromDateChange(fromDate?: string) {
    if (fromDate?.length) {
      setFilterParams("fromDate", [fromDate]);
    } else {
      searchParams.delete("fromDate");
      setSearchParams(searchParams);
    }
  }

  function handleToDateChange(toDate?: string) {
    if (toDate?.length) {
      setFilterParams("toDate", [toDate]);
    } else {
      searchParams.delete("toDate");
      setSearchParams(searchParams);
    }
  }

  function handleResetParams() {
    setSearchParams("");
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
    handlePageChange,
    handleSearchChange,
    handleGroupChange,
    handleDesignationChange,
    handleSortChange,
    handleFromDateChange,
    handleToDateChange,
    handleResetParams,
    handlePageLimit,
    handleTravelTypeChange,
    getSortOrder,
  };
};

export const getSearchParams = () => {
  const request = new Request(window.location.href);
  const url = new URL(request.url);
  const page = new URLSearchParams(url.search).get("page") || "1";
  const limit = new URLSearchParams(url.search).get("limit") || "10";
  const search = new URLSearchParams(url.search).get("search") || "";
  const sp = new URLSearchParams(url.search).get("sp") || "";
  const payrollGroup =
    new URLSearchParams(url.search).get("payrollGroup") || "";
  const travelType = new URLSearchParams(url.search).get("travelType") || "";
  const designation = new URLSearchParams(url.search).get("designation") || "";
  const fromDate = new URLSearchParams(url.search).get("fromDate") || "";
  const toDate = new URLSearchParams(url.search).get("toDate") || "";

  const searchParams = {
    page,
    limit,
    search,
    sp,
    payrollGroup,
    designation,
    fromDate,
    toDate,
    travelType,
  };

  return {
    page,
    limit,
    search,
    sp,
    fromDate,
    toDate,
    searchParams,
  };
};

export type setFilterParamsType = ReturnType<typeof useFilterParams>;

export default useFilterParams;
