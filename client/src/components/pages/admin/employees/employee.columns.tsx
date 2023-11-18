import DataTableHeader from "@/components/ui/data-table-header";
import TableActions from "@/components/ui/table-actions";

import { ColumnDef } from "@tanstack/react-table";
import DeleteEmployee from "./form/DeleteEmployee";
import EditEmployee from "./form/EditEmployee";

export type TGlobalEmployees = TEmployees;

export const employeeColumns: ColumnDef<TEmployees>[] = [
  {
    accessorKey: "employeeId",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Employee Id</span>
        </DataTableHeader>
      );
    },

    cell: ({ row }) => (
      <div className=" px-3">{row.getValue("employeeId")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>First Name</span>
        </DataTableHeader>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Last Name</span>
        </DataTableHeader>
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
    accessorKey: "payrollGroupId",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Payroll Group</span>
        </DataTableHeader>
      );
    },
  },
  {
    accessorKey: "designationId",
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
      const employee = row.original;
      console.log(employee);
      // eslint-disable-next-line react-hooks/rules-of-hooks

      return (
        <>
          <TableActions
            deleteElement={<DeleteEmployee id={employee.id} />}
            editElement={<EditEmployee item={employee} />}
          />
        </>
      );
    },
  },
];
