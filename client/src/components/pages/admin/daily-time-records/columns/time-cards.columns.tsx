import DataTableActions from "@/components/ui/data-table-actions";
import DataTableHeader from "@/components/ui/data-table-header";
import { ColumnDef } from "@tanstack/react-table";
// import DeleteDesignation from "../form/designation/DeleteDesignation";
// import EditDesignation from "../form/designation/EditDesignation";

import ParseDate from "@/components/ui/parse-date";
import { Badge } from "@/components/ui/badge";
import { differenceInDays } from "date-fns";
import IsNew from "@/components/ui/isnew";
import { CalendarRange, File, FileStack } from "lucide-react";
import { IconProperties, Links } from "@/types/common";
import DeleteTimeCard from "../form/time-cards/DeleteTimeCard";
import EditTimeCard from "../form/time-cards/EditTimeCard";

export const timeCardColumns: ColumnDef<TDataFields>[] = [
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
    accessorKey: "timeCardPeriod",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>Time Card Period</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 flex-wrap">
          <div className="space-x-1 space-y-1">
            <ParseDate>{row.original.from}</ParseDate>
            <span>to</span>
            <ParseDate>{row.original.to}</ParseDate>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="flex items-center justify-center space-x-1"
            >
              <CalendarRange
                size={IconProperties.SIZE_ICON}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
              <span>
                {differenceInDays(
                  new Date(row.original.to),
                  new Date(row.original.from)
                ) + 1}{" "}
                days
              </span>
            </Badge>
            <IsNew status={row.original.status} />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isAllEmployees",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          <span>For All Employees?</span>
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      return row.original.isAllEmployees ? <span>Yes </span> : <span>No </span>;
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
        <DataTableActions
          key={row.original.id}
          navigateElement={[
            {
              to: `${Links.TIME_CARDS}/${row.original.id}`,
              label: (
                <>
                  <span>View </span>
                  <File size={IconProperties.SIZE_ICON} />
                </>
              ),
            },
            {
              to: `${Links.TIME_CARDS}/${row.original.id}`,
              label: (
                <>
                  <span>View in new tab</span>{" "}
                  <FileStack size={IconProperties.SIZE_ICON} />
                </>
              ),
              newTab: true,
            },
          ]}
          deleteElement={<DeleteTimeCard data={row.original} trigger={false} />}
          editElement={
            <EditTimeCard toEditItem={row.original} from="tableAction" />
          }
        />
      );
    },
  },
];
