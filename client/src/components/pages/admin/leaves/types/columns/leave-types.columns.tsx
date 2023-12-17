import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import ParseDate from "@/components/ui/ParseDate";
import DeleteHoliday from "../form/DeleteLeaveType";
import EditHoliday from "../form/EditLeaveType";
import DeleteLeaveType from "../form/DeleteLeaveType";
import EditLeaveType from "../form/EditLeaveType";

export const leaveTypesColumns: ColumnDef<TDataFields>[] = [
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
              <DeleteLeaveType data={row.original} trigger={false} />
            }
            editElement={
              <EditLeaveType toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
