import { FolderX } from "lucide-react";
import React from "react";

type Props = {
  icon?: React.ReactNode;
  label?: string;
};

function IsEmptyContent({ icon, label }: Props) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full h-[150px]">
      <span className="text-muted-foreground text-center">
        {icon ? icon : <FolderX size={36} strokeWidth={1.5} />}
      </span>
      <h1 className="text-sm  text-muted-foreground font-semibold text-center">
        {label ? label : "No data available"}
      </h1>
    </div>
  );
}

export default IsEmptyContent;
