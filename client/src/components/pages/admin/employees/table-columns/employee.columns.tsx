import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
import DeleteEmployee from "../form/employee/DeleteEmployee";
import EditEmployee from "../form/employee/EditEmployee";
import { Badge } from "@/components/ui/badge";
import ParseDate from "@/components/ui/parse-date";
import EmptyCellBadge from "@/components/ui/empty-cell-badge";
import logo from "@/assets/bfarlogo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    accessorKey: "rfId",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>RFID</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.rfId ? (
        <span>{row.original.rfId}</span>
      ) : (
        <EmptyCellBadge label="rfid" />
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
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              <img
                src={logo}
                alt="avatar logo"
                className="w-8 h-8 rounded-full"
              />
            </AvatarFallback>
            <AvatarImage src={row.original.avatar} alt={row.original.avatar} />
          </Avatar>
          <span>{row.original.fullName}</span>
        </div>
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
            <EmptyCellBadge label="fund cluster" />
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
            <EmptyCellBadge label="fund cluster" />
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
            <EmptyCellBadge label="fund cluster" />
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
