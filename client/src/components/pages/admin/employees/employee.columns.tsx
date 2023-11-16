import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TEmployees = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  age: number;
  avatar?: string;
  payrollGroupId?: string;
  designationId?: string;
  createdAt: string;
};

export const employeeColumns: ColumnDef<TEmployees>[] = [
  {
    accessorKey: "employeeId",
    header: "id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
  },
  {
    accessorKey: "payrollGroupId",
    header: "Payroll Group Id",
  },
  {
    accessorKey: "designationId",
    header: "Designation Id",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
