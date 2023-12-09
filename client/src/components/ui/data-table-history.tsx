import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { History } from "lucide-react";
import { buttonVariants } from "./button";

type TDataTableHistory = {
  render: {
    edited: React.ReactNode;
    deleted: React.ReactNode;
    created: React.ReactNode;
  };
};

function DataTableHistory({ render }: TDataTableHistory) {
  return (
    <Sheet>
      <SheetTrigger
        className={
          buttonVariants({
            variant: "outline",
            size: "sm",
            className: "text-muted-foreground",
          }) + ` self-start hidden lg:flex gap-2 text-xs`
        }
      >
        <History size="16" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Activities</SheetTitle>
          <SheetDescription>Activities made recently</SheetDescription>
        </SheetHeader>

        <div className="mt-4">
          <h1 className="font-semibold">Updates</h1>
          {render.edited}
        </div>
        <div>
          <h1 className="font-semibold">Deletions</h1>
          {render.deleted}
        </div>
        <div>
          <h1 className="font-semibold">Creations</h1>
          {render.created}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default DataTableHistory;
