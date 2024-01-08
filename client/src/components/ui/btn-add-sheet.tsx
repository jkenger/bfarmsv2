import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

type Props = {
  triggerElement: React.ReactNode;
  title?: string;
  table?: string;
  description?: string;
  error?: string;
  children?: React.ReactNode;
  side?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "mutationRight"
    | "largeRight"
    | null
    | undefined;
};

function MutationSheet({
  triggerElement,
  title = "",
  table = "",
  description = "",
  error = "",
  side = "mutationRight",
  children,
}: Props) {
  return (
    <Sheet>
      {triggerElement}
      <SheetContent side={side} className="bg-card px-0">
        <SheetHeader className="px-6">
          <SheetTitle className="flex items-center gap-3">
            <span>{title}</span>
            <Badge variant="outline"> {table}</Badge>
          </SheetTitle>
          <SheetDescription
            className={`text-start ${error ? " text-red-500" : ""}`}
          >
            {description} {error ? error : ""}
          </SheetDescription>
        </SheetHeader>
        <div className="h-[85vh] overflow-y-scroll px-6 scroll-smooth">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MutationSheet;
