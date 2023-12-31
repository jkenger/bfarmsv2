import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { Table, VisibilityState } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { IconProperties } from "@/types/common";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  onSetColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

export function DataTableViewOptions<TData>({
  table,
  onSetColumnVisibility,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="space-x-2">
          <span>
            <SlidersHorizontal
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          </span>
          <span> View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                  onSetColumnVisibility((prev: VisibilityState) => ({
                    ...prev,
                    [column.id]: !!value,
                  }));
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
