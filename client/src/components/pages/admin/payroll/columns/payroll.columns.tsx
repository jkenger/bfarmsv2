import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
// import DeleteDesignation from "../form/designation/DeleteDesignation";
// import EditDesignation from "../form/designation/EditDesignation";

import DeletePayrollGroup from "../form/payrollgroups/DeletePayrollGroup";
import EditPayrollGroup from "../form/payrollgroups/EditPayrollGroup";
import ParseDate from "@/components/ui/parse-date";
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";

export const payrollColumns: ColumnDef<TDataFields>[] = [
  {
    accessorKey: "payrollPeriod",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Payroll Period</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="space-x-1">
          <ParseDate>{row.original.from}</ParseDate>
          <span>to</span>
          <ParseDate>{row.original.to}</ParseDate>
          <Badge variant="outline">
            {differenceInDays(
              new Date(row.original.to),
              new Date(row.original.from)
            ) + 1}{" "}
            days
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "fundCluster",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Fund Cluster</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.payrollGroup.fundCluster}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Project Name</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-lg max-w-lg">{row.original.payrollGroup.name} </div>
      );
    },
  },
  {
    accessorKey: "programName",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Program Name</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.payrollGroup.programName}</div>;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Created</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.createdAt}</ParseDate>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <>
          <DataTableActions
            key={row.original.id}
            deleteElement={
              <DeletePayrollGroup data={row.original} trigger={false} />
            }
            editElement={
              // @TOCHANGE
              <EditPayrollGroup toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
