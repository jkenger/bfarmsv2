import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";

import ParseDate from "@/components/ui/parse-date";
import DeleteTravelpass from "../form/travelpass/DeleteTravelpass";
import EditTravelpass from "../form/travelpass/EditTravelpass";
import FormatToFullName from "@/components/ui/format-to-fullname";

export const travelpassColumns: ColumnDef<TDataFields>[] = [
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>User</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.user.firstName;
      const middleName = row.original.user.middleName;
      const lastName = row.original.user.lastName;
      return (
        <FormatToFullName
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
        />
      );
    },
  },
  {
    accessorKey: "typeOf",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Type of</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row.original.typeOf.replace(/([A-Z])/g, " $1")}
        </span>
      );
    },
  },

  {
    accessorKey: "start",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Start Date</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.start}</ParseDate>;
    },
  },
  {
    accessorKey: "end",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>End Date</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.end}</ParseDate>;
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
    accessorKey: "expiresAt",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Expires At</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.expireAt}</ParseDate>;
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
              <DeleteTravelpass data={row.original} trigger={false} />
            }
            editElement={
              // @TOCHANGE
              <EditTravelpass toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
