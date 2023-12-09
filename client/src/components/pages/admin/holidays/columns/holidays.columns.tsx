import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import ParseDate from "@/components/ui/ParseDate";
import DeleteHoliday from "../form/DeleteHoliday";
import EditHoliday from "../form/EditHoliday";

export const holidaysColumns: ColumnDef<TDataFields>[] = [
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
    cell: ({ row }) => {
      return <div className="w-lg max-w-lg">{row.original.description} </div>;
    },
  },

  {
    accessorKey: "prerequisiteDate",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Pre-requisite Date</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.prerequisiteDate}</ParseDate>;
    },
  },
  {
    accessorKey: "requisiteDate",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Requisite Date</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return <ParseDate>{row.original.requisiteDate}</ParseDate>;
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
              <DeleteHoliday data={row.original} trigger={false} />
            }
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
