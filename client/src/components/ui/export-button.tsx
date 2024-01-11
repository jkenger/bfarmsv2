import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Braces, ChevronDown } from "lucide-react";
import { IconProperties } from "@/types/common";
import useHandleExport from "../hooks/useHandleExport";

type Props = {
  data: any[];
};

function ExportButton({ data }: Props) {
  const { handleExportToJSON, handleExportToCSV } = useHandleExport();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="space-x-2">
          <span>Export as</span>
          <ChevronDown
            className="h-4 w-4"
            size={IconProperties.SIZE_ICON}
            strokeWidth={IconProperties.STROKE_WIDTH}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between gap-2"
            onClick={() => handleExportToJSON(data)}
          >
            Export as Json
            <Braces
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem className="p-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => handleExportToCSV(data)}
          >
            Export as Excel
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportButton;
