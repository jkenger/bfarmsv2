import { ArrowUpDown } from "lucide-react";

import { Column } from "@tanstack/react-table";

type Props<T> = {
  column: Column<T, unknown>;
  children: React.ReactNode;
};

function DataTableHeader<T>({ column, children }: Props<T>) {
  return (
    <div
      className="flex justify-between items-center hover:cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {/* <DataTableHeader title="Employee Id" />, */}
      {children}
      <ArrowUpDown
        className={`ml-2 h-4 w-4 ${
          column.getIsSorted() === "asc" ? "text-primary" : ""
        }`}
      />
    </div>
  );
}

export default DataTableHeader;
