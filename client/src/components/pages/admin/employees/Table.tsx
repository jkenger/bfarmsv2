import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./api/employee.api";
import { DataTable } from "@/components/ui/data-table";
import TableSkeleton from "@/components/ui/table-skeleton";

type Props = {
  employeeColumns: ColumnDef<TEmployees>[];
};

function EmployeeTable({ employeeColumns }: Props) {
  const {
    data: {
      data: { message: data },
    },
    isFetching,
  } = useQuery(getEmployees());
  return isFetching ? (
    <TableSkeleton />
  ) : (
    <DataTable columns={employeeColumns} data={data} />
  );
}

export default EmployeeTable;
