import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import DeleteEmployee from "../form/employee/DeleteEmployee";
import EditEmployee from "../form/employee/EditEmployee";
import { Badge } from "@/components/ui/badge";
import ParseDate from "@/components/ui/ParseDate";

export type TGlobalEmployees = TEmployees;

export const employeeColumns: ColumnDef<TDataFields>[] = [
  {
    accessorKey: "employeeId",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Code</span>
        </DataTableHeader>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Name</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.firstName || "";
      const middleName = row.original.middleName || "";
      const lastName = row.original.lastName || "";
      return (
        <span>
          {lastName}, {firstName}{" "}
          {middleName !== "" ? middleName.charAt(0) + "." : ""}{" "}
        </span>
      );
    },
  },

  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Age</span>
        </DataTableHeader>
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
      return (
        <span>
          {row.original.payrollGroup ? (
            row.original.payrollGroup?.fundCluster
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              No fund cluster
            </Badge>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "payrollGroup",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Payroll Group</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-md max-w-md">
          {row.original.payrollGroup ? (
            row.original.payrollGroup?.name
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              No payroll group
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Designation</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.designation ? (
            row.original.designation?.name
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              No designation
            </Badge>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "salary",
    header: () => {
      return <span className="text-semibold">Salary</span>;
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.designation ? (
            <>
              ₱
              {new Intl.NumberFormat()
                .format(Number(row.original.designation.salary))
                .toString()}{" "}
            </>
          ) : (
            <>
              <Badge variant="outline" className="text-muted-foreground">
                No salary
              </Badge>
            </>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Joined</span>
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
