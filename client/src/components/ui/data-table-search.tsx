import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Badge } from "./badge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const DataTableSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 h-8 w-full rounded-md border border-input bg-transparent px-3 text-xs shadow-sm  ",
          className
        )}
      >
        <Search size="16" className="text-muted-foreground" />
        <input
          type={type}
          ref={ref}
          {...props}
          className="w-full rounded-md h-8 bg-transparent file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Badge variant="outline">all</Badge>
      </div>
    );
  }
);
DataTableSearch.displayName = "DataTableSearch";

export default DataTableSearch;
