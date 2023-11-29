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
import { useLayoutEffect, useRef } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { RotateCw } from "lucide-react";
import { Button } from "./button";
import { IconProperties } from "@/types/common";
import debounce from "debounce";
import FacetedFilterButton from "./data-table-faceted-filter";
import DataTableSearch from "./data-table-search";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  numOfPages?: number;
  dataReloader?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  numOfPages = 0,
  dataReloader,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    useLocalStorageState<VisibilityState>([], "columnVisibility");
  const isFetching = useIsFetching();
  const {
    handleSearchChange,
    handlePageChange,
    getSearchParams,
    handleGroupChange,
    handleDesignationChange,
  } = useFilterParams();
  const { page, search } = getSearchParams();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Set column visibility on mount
  useLayoutEffect(() => {
    if (!columnVisibility.length) {
      table.setColumnVisibility(columnVisibility as VisibilityState);
    } else {
      table.setColumnVisibility({
        firstName: false,
        lastName: false,
      } as VisibilityState);
    }
  }, [columnVisibility, table]);

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(table.getAllColumns());
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {/* Search  Input*/}
          <DataTableSearch
            placeholder="Search"
            id="search"
            ref={inputRef}
            defaultValue={search ? search : ""}
            className="w-full md:w-auto justify-start text-left font-normal"
            onChange={debounce((e) => {
              handleSearchChange(e.target.value);
              handlePageChange(1);
            }, 500)}
          />

          {/* <div className="">
            <Input
              id="search"
              placeholder="Search"
              ref={inputRef}
              defaultValue={search ? search : ""}
              className="w-full md:w-auto justify-start text-left font-normal"
              onChange={debounce((e) => {
                handleSearchChange(e.target.value);
                handlePageChange(1);
              }, 500)}
            />
          </div> */}
          <FacetedFilterButton
            onSelectedChange={handleGroupChange}
            // filter={jobStatusfilter}
            options={["sampel1", "sample2"]}
          >
            Payroll Group
          </FacetedFilterButton>
          <FacetedFilterButton
            onSelectedChange={handleDesignationChange}
            // filter={jobStatusfilter}
            options={["groupOptions", "groupOptions2"]}
          >
            Designations
          </FacetedFilterButton>
        </div>
        <div className="flex justify-end gap-2">
          {/* Column Vibility Button */}
          <DataTableViewOptions
            table={table}
            onSetColumnVisibility={
              setColumnVisibility as React.Dispatch<
                React.SetStateAction<VisibilityState>
              >
            }
          />
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            disabled={isFetching > 0}
            onClick={dataReloader}
          >
            <RotateCw
              className={`${isFetching && "animate-spin"}`}
              size={IconProperties.SIZE_ICON}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
          </Button>
        </div>
      </div>

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
