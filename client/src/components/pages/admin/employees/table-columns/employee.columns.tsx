import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import DeleteEmployee from "../form/DeleteEmployee";
import EditEmployee from "../form/EditEmployee";

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
    accessorKey: "avatar",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Avatar</span>
        </DataTableHeader>
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
          <span>Joined</span>
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
              <DeleteEmployee id={row.original.id} trigger={false} />
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
