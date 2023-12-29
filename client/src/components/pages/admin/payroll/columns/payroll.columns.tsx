import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
// import DeleteDesignation from "../form/designation/DeleteDesignation";
// import EditDesignation from "../form/designation/EditDesignation";
import { Badge } from "@/components/ui/badge";
import DeletePayrollGroup from "../form/payrollgroups/DeletePayrollGroup";
import EditPayrollGroup from "../form/payrollgroups/EditPayrollGroup";
import ParseDate from "@/components/ui/parse-date";

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
        <div>
          <ParseDate>{row.original.from}</ParseDate>
          to
          <ParseDate>{row.original.to}</ParseDate>
        </div>
      );
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
      return <div className="w-lg max-w-lg">{row.original.name} </div>;
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

    cell: ({ row }) => {
      return row.original.users.length > 0 ? (
        <span> {row.original.users.length} Employees </span>
      ) : (
        <Badge variant="outline">No employee</Badge>
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
