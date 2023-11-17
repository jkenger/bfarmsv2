import { Button } from "@/components/ui/button";
import DataTableHeader from "@/components/ui/data-table-header";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { IconProperties } from "@/types";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PenSquare, Trash } from "lucide-react";

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
    cell: () => {
      // const employee = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
              >
                <PenSquare size={IconProperties.SIZE} />
                Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
              >
                <Trash size={IconProperties.SIZE} className="text-red-500" />
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
