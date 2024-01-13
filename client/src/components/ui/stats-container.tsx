import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function StatsContainer({ children, className }: Props) {
  return <div className={cn("grid  gap-2 w-full ", className)}>{children}</div>;
}

export default StatsContainer;
