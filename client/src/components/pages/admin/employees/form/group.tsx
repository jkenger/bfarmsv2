import { Badge } from "@/components/ui/badge";
import { IconProperties } from "@/types/common";

import { ArrowRight } from "lucide-react";
import React from "react";

type Props = { children: React.ReactNode; assignTo: string };

function Group({ children, assignTo }: Props) {
  return (
    <div className="flex items-start   gap-2 w-full max-w-md">
      <Badge
        variant="outline"
        className="w-1/3 text-[.6rem] sm:text-xs text-muted-foreground"
      >
        {assignTo}
      </Badge>
      <div className="mt-1">
        <ArrowRight
          size={IconProperties.SIZE}
          strokeWidth={IconProperties.STROKE_WIDTH}
        />
      </div>
      <Badge
        variant="outline"
        className="ml-2 md:ml-0 text-[.6rem] sm:text-xs w-2/3 text-muted-foreground "
      >
        {children}
      </Badge>
    </div>
  );
}

export default Group;
