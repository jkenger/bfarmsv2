import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import DeleteEmployee from "../form/employee/DeleteEmployee";
import EditEmployee from "../form/employee/EditEmployee";

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
              <DeleteEmployee data={row.original} trigger={false} />
            }
            editElement={
              <EditEmployee toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
