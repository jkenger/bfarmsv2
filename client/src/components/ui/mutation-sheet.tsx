import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { Button } from "./button";

type Props = {
  triggerElement: React.ReactNode;
  title?: string;
  table?: string;
  description?: string;
  children?: React.ReactNode;
};

function MutationSheet({
  triggerElement,
  title = "",
  table = "",
  description = "",
  children,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger>{triggerElement}</SheetTrigger>
      <SheetContent side="mutationRight" className="bg-card">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            <span>{title}</span>
            <Badge variant="outline"> {table}</Badge>
          </SheetTitle>
          <SheetDescription className="text-start">
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter className="flex justify-end absolute bottom-4 right-4 w-full gap-2">
          <SheetClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </SheetClose>
          <Button variant="default" type="submit">
            Add Column
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MutationSheet;
