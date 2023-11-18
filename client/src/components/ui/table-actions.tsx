import React, { cloneElement } from "react";
import { MoreVertical, PenSquare, Trash } from "lucide-react";

import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { IconProperties } from "@/types/common";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  deleteElement: React.ReactNode;
  editElement: React.ReactNode;
};

function TableActions({ deleteElement, editElement }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setOpenEditDialog(true)}
          >
            <PenSquare size={IconProperties.SIZE} />
            Edit
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash size={IconProperties.SIZE} className="text-red-500" />
            Delete
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

export default TableActions;
