import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import ParseDate from "@/components/ui/parse-date";

import EditHoliday from "../form/EditDTR";
import { TableHead } from "@/components/ui/table";
import ParseTime from "@/components/ui/parse-time";
import EmptyCellBadge from "@/components/ui/empty-cell-badge";
import DeleteDTR from "../form/DeleteDTR";

export const dtrColumns: ColumnDef<TDataFields>[] = [
  {
    accessorKey: "employeeId",
    header: ({ column }) => {
      return (
        <TableHead>
          <DataTableHeader column={column}>
            <span>Employee</span>
          </DataTableHeader>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.user.employeeId}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <TableHead>
          <DataTableHeader column={column}>
            <span>Name</span>
          </DataTableHeader>
        </TableHead>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.user.avatar}
            alt={row.original.user.avatar}
            className="w-8 h-8 rounded-full"
          />
          <span>{row.original.user.fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amTimeIn",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>AM Time In</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.amTimeIn ? (
        <ParseTime>{row.original.amTimeIn}</ParseTime>
      ) : (
        <EmptyCellBadge fullLabel="--:--:-- --" />
      );
    },
  },

  {
    accessorKey: "amTimeOut",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>AM Time Out</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.amTimeOut ? (
        <ParseTime>{row.original.amTimeOut}</ParseTime>
      ) : (
        <EmptyCellBadge fullLabel="--:--:-- --" />
      );
    },
  },

  {
    accessorKey: "pmTimeIn",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>PM Time In</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.pmTimeIn ? (
        <ParseTime>{row.original.pmTimeIn}</ParseTime>
      ) : (
        <EmptyCellBadge fullLabel="--:--:-- --" />
      );
    },
  },

  {
    accessorKey: "pmTimeOut",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>PM Time Out</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.pmTimeOut ? (
        <ParseTime>{row.original.pmTimeOut}</ParseTime>
      ) : (
        <EmptyCellBadge fullLabel="--:--:-- --" />
      );
    },
  },
  {
    accessorKey: "lateMinutes",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Late in Minutes</span>
        </DataTableHeader>
      );
    },
  },
  {
    accessorKey: "undertimeMinutes",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Undertime in Minutes</span>
        </DataTableHeader>
      );
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
            deleteElement={<DeleteDTR data={row.original} trigger={false} />}
            editElement={
              // @TOCHANGE
              <EditHoliday toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
