import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
// import DeleteDesignation from "../form/designation/DeleteDesignation";
// import EditDesignation from "../form/designation/EditDesignation";

import ParseDate from "@/components/ui/parse-date";
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";
import EditPayroll from "../form/payroll/EditPayroll";
import DeletePayroll from "../form/payroll/DeletePayroll";
import IsNew from "@/components/ui/isnew";
import { CalendarRange } from "lucide-react";
import { IconProperties } from "@/types/common";

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
        <div className="flex gap-1 flex-wrap">
          <div className="space-x-1 space-y-1">
            <ParseDate>{row.original.from}</ParseDate>
            <span>to</span>
            <ParseDate>{row.original.to}</ParseDate>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="flex items-center justify-center space-x-1"
            >
              <CalendarRange
                size={IconProperties.SIZE_ICON}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
              <span>
                {differenceInDays(
                  new Date(row.original.to),
                  new Date(row.original.from)
                ) + 1}{" "}
                days
              </span>
            </Badge>
            <IsNew status={row.original.status} />
          </div>
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
      return <span>{row.original.payrollGroup.fundCluster}</span>;
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
              <DeletePayroll data={row.original} trigger={false} />
            }
            editElement={
              // @TOCHANGE
              <EditPayroll toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
