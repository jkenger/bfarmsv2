import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function List({ children, className }: Props) {
  return (
    <li className={cn("flex flex-col relative", className)}>{children}</li>
  );
}

export default List;
