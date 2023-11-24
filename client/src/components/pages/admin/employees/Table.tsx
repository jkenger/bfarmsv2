import { ColumnDef } from "@tanstack/react-table";
import { createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./api/employee.api";
import { DataTable } from "@/components/ui/data-table";
import TableSkeleton from "@/components/ui/table-loader";
import usePaginationParams from "@/components/hooks/useFilterParams";
import TableLoader from "@/components/ui/table-loader";
import BFARLogo from "@/components/ui/logo";
import TableFallBack from "@/components/ui/table-fallback";

type Props = {
  employeeColumns: ColumnDef<TEmployees>[];
  initialData: TEmployees[];
};

export type TEmployeeTableContext = {
  data: TEmployees[];
  numOfPages: number;
};

const initialState = {
  data: [],
  numOfPages: 0,
};

const EmployeeTableContext = createContext<TEmployeeTableContext>(initialState);

// Props
//  employeeColumns: ColumnDef<TEmployees>[];
// Hooks
//  usePaginationParams

function EmployeeTable({ employeeColumns }: Props) {
  const { page, limit, search, sp } = usePaginationParams();

  const {
    data: res,
    isPending,
    isError,
    isSuccess,
    error,
  } = useQuery(getEmployees({ page, limit, search, sp }));

  const data = res ? res.data.data : [];
  const numOfPages = res ? res.data.numOfPages : 0;
  // reset page to 1 if data length is less than numOfPages

  const value: TEmployeeTableContext = {
    data,
    numOfPages,
  };

  return (
    <EmployeeTableContext.Provider value={value}>
      {isPending && (
        <div className="relative">
          <DataTable
            columns={employeeColumns}
            data={data}
            numOfPages={numOfPages}
          />
          <TableLoader />
        </div>
      )}
      {isSuccess && (
        <div className="relative">
          <DataTable
            columns={employeeColumns}
            data={data}
            numOfPages={numOfPages}
          />
        </div>
      )}
      {isError && <div className="relative">{error.message}</div>}
    </EmployeeTableContext.Provider>
  );
}

export function useEmployeeTable() {
  const context = useContext(EmployeeTableContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeTable must be used within a EmployeeTableContext"
    );
  }
  return context;
}

export default EmployeeTable;
