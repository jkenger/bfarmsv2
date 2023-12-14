import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import CountBadge from "@/components/ui/count-badge";

import DeleteDeduction from "../form/deductions/DeleteDeduction";
import EditDeduction from "../form/deductions/EditDeduction";

export const deductionsColumns: ColumnDef<TDataFields>[] = [
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
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Amount</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.amount ? (
            <>
              ₱
              {new Intl.NumberFormat()
                .format(Number(row.original.amount))
                .toString()}{" "}
            </>
          ) : (
            <>
              <Badge variant="outline" className="text-muted-foreground">
                No amount
              </Badge>
            </>
          )}
        </span>
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
    cell: ({ row }) => <CountBadge length={row.original.users?.length} />,
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
              <DeleteDeduction data={row.original} trigger={false} />
            }
            editElement={
              // @TOCHANGE
              <EditDeduction toEditItem={row.original} from="tableAction" />
            }
          />
        </>
      );
    },
  },
];
