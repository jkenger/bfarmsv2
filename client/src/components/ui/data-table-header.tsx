import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Column } from "@tanstack/react-table";
import useFilterParams from "../hooks/useFilterParams";
import { IconProperties, SortType } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

type Props<T> = {
  column: Column<T, unknown>;
  children: React.ReactNode;
};

function DataTableHeader<T>({ column, children }: Props<T>) {
  const { handleSortChange, getSortOrder } = useFilterParams();
  const { field, order } = getSortOrder();
  if (order) {
    console.log(field, order);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 justify-between items-center hover:cursor-pointer">
        {children}
        <div>
          {order === "" && field === "" && (
            <ChevronsUpDown
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order && column.id !== field && (
            <ChevronsUpDown
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order === SortType.ASC && column.id === field && (
            <ArrowUp
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order === SortType.DESC && column.id === field && (
            <ArrowDown
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}

          {/* <MoveDown /> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full h-8 space-x-2 flex justify-start"
            onClick={() => handleSortChange([column.id, SortType.ASC])}
          >
            <span className="text-muted-foreground">
              <ArrowUp
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            </span>
            <span>Asc</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full h-8 space-x-2 flex justify-start"
            onClick={() => handleSortChange([column.id, SortType.DESC])}
          >
            <span className="text-muted-foreground">
              <ArrowDown
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            </span>
            <span>Desc</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableHeader;
