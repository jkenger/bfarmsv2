import React, { cloneElement } from "react";
import { Delete, File, MoreVertical } from "lucide-react";

import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { IconProperties, Links } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "./separator";
import { useNavigate } from "react-router-dom";

type Props = {
  deleteElement: React.ReactNode;
  editElement: React.ReactNode;
  navigateElement?: {
    to: Links | string;
  };
};

function DataTableActions({
  deleteElement,
  editElement,
  navigateElement,
}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical
            className="h-4 w-4"
            size={IconProperties.SIZE_ICON}
            strokeWidth={IconProperties.STROKE_WIDTH}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {navigateElement && (
          <>
            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between gap-2"
                onClick={() => navigate(navigateElement.to)}
              >
                View <File size={IconProperties.SIZE_ICON} />
              </Button>
            </DropdownMenuItem>
            <Separator orientation="horizontal" />
          </>
        )}
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setOpenEditDialog(true)}
          >
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between gap-2"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
            <Delete
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
              className="text-red-500"
            />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>

      {cloneElement(editElement as React.ReactElement, {
        open: openEditDialog,
        onOpen: setOpenEditDialog,
      })}

      {cloneElement(deleteElement as React.ReactElement, {
        open: openDeleteDialog,
        onOpen: setOpenDeleteDialog,
      })}
    </DropdownMenu>
  );
}

export default DataTableActions;
