import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDesignation from "../form/designation/DeleteDesignation";
import EditDesignation from "../form/designation/EditDesignation";

import ParseDate from "@/components/ui/parse-date";
import CountBadge from "@/components/ui/count-badge";

export const designationColumns: ColumnDef<TDataFields>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Name</span>
        </DataTableHeader>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Description</span>
        </DataTableHeader>
      );
    },
  },

  {
    accessorKey: "users",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Users</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => <CountBadge length={row.original.users.length} />,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Salary</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          ₱
          {new Intl.NumberFormat()
            .format(Number(row.original.salary))
            .toString()}{" "}
        </span>
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
            deleteElement={
              <DeleteDesignation data={row.original} trigger={false} />
            }
            editElement={
              <EditDesignation toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
