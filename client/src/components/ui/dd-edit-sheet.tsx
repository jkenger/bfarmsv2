import React from "react";
import { Badge } from "./badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Tables } from "@/types/common";

type Props = {
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  table?: Tables;
  description?: string;
  children?: React.ReactNode;
};

function DropDownEditSheet({
  open,
  onOpen,
  table = "unknown",
  description,
  children,
}: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpen}>
      <SheetContent side="mutationRight" className="bg-card px-0">
        <SheetHeader className="px-6">
          <SheetTitle className="flex items-center gap-3">
            <span>Update data in</span>
            <Badge variant="outline"> {table}</Badge>
          </SheetTitle>
          <SheetDescription className="text-start">
            {description}
          </SheetDescription>
        </SheetHeader>
        <div className="h-[85vh] overflow-y-scroll px-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

export default DropDownEditSheet;
