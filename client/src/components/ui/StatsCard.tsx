import { cn } from "@/lib/utils";
import React from "react";

type TProps = {
  children: React.ReactNode;
  className?: string;
};

function StatsCard({ children }: TProps) {
  return (
    <div className=" text-md bg-card rounded">
      <div className="flex justify-between flex-col ">{children}</div>
    </div>
  );
}

function Header({ children }: TProps) {
  return (
    <div className="p-4 flex justify-start items-center text-xs">
      {children}
    </div>
  );
}

function Body({ children, className }: TProps) {
  return (
    <div className={cn("flex justify-between text-xl", className)}>
      {children}
    </div>
  );
}

StatsCard.Header = Header;
StatsCard.Body = Body;

export default StatsCard;
