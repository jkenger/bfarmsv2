"use client";

import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "./table-loader";
import { useIsFetching } from "@tanstack/react-query";
import DataTablePaginationNoBtn from "./data-table-pagination-nobtn";
import useFilterParams from "../hooks/useFilterParams";
import { DataTableViewOptions } from "./data-table-view-options";
import { useLayoutEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  numOfPages?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  numOfPages = 0,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    useLocalStorageState<VisibilityState>([], "columnVisibility");
  console.log(columnVisibility);
  const isFetching = useIsFetching();
  const { page } = useFilterParams();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  useLayoutEffect(() => {
    if (columnVisibility) {
      table.setColumnVisibility(columnVisibility);
    }
  }, [columnVisibility, table]);
  return (
    <div className="space-y-2">
      <DataTableViewOptions
        table={table}
        onSetColumnVisibility={setColumnVisibility}
      />
      <div className="rounded-md border relative">
        <Table className="bg-card">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="[&>*:first-child]:pl-4 "
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {isFetching ? <TableLoader /> : ""}
      </div>
      {/* Pagination Controls */}
      <div id="footer" className="flex justify-end items-center gap-2">
        <div>
          <span className="text-sm text-muted-foreground">
            Showing page <span className="text-primary">{page}</span> of{" "}
            {numOfPages} results
          </span>
        </div>
        <DataTablePaginationNoBtn numOfPages={numOfPages} />
      </div>
    </div>
  );
}
