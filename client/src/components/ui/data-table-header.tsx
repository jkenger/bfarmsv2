import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

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
import { useIsFetching } from "@tanstack/react-query";

type Props<T> = {
  column: Column<T, unknown>;
  children: React.ReactNode;
};

function DataTableHeader<T>({ column, children }: Props<T>) {
  const { handleSortChange, getSortOrder } = useFilterParams();
  const isFetching = useIsFetching();
  const { field, order } = getSortOrder();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 justify-between items-center hover:cursor-pointer">
        <span className="font-semibold">{children}</span>
        <div>
          {order === "" && field === "" && (
            <ChevronsUpDown
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order && column.id !== field && (
            <ChevronsUpDown
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order === SortType.ASC && column.id === field && (
            <ArrowUp
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          )}
          {order === SortType.DESC && column.id === field && (
            <ArrowDown
              size={IconProperties.SIZE_ICON}
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
            className="w-full h-8 space-x-2 flex justify-start hover:cursor-pointer"
            onClick={() => handleSortChange([column.id, SortType.ASC])}
            disabled={isFetching > 0}
          >
            <span className="text-muted-foreground">
              <ArrowUp
                className="text-muted-foreground"
                size={IconProperties.SIZE_ICON}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            </span>
            <span>Asc</span>
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full h-8 space-x-2 flex justify-start hover:cursor-pointer"
            onClick={() => handleSortChange([column.id, SortType.DESC])}
            disabled={isFetching > 0}
          >
            <span className="text-muted-foreground">
              <ArrowDown
                className="text-muted-foreground"
                size={IconProperties.SIZE_ICON}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            </span>
            <span>Desc</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full h-8 space-x-2 flex justify-start"
            onClick={() => column.toggleVisibility(false)}
            disabled={isFetching > 0}
          >
            <span className="text-muted-foreground">
              <EyeOff
                className="text-muted-foreground"
                size={IconProperties.SIZE_ICON}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
            </span>
            <span>Hide</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableHeader;
