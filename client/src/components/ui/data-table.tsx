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
import {
  Mutation,
  useIsFetching,
  useIsMutating,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";
import DataTablePaginationNoBtn from "./data-table-pagination-nobtn";
import useFilterParams, { getSearchParams } from "../hooks/useFilterParams";
import { DataTableViewOptions } from "./data-table-view-options";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { RotateCw, X } from "lucide-react";
import { Button } from "./button";
import { IconProperties, QueryKeys } from "@/types/common";
import debounce from "debounce";
import FacetedFilterButton from "./data-table-faceted-filter";
import DataTableSearch from "./data-table-search";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Badge } from "./badge";
import { createEmployee } from "../pages/admin/employees/api/employee.api";

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
  const isMutating = useIsMutating();
  const {
    handleSearchChange,
    handlePageChange,
    handleGroupChange,
    handleDesignationChange,
    handleResetParams,
    handlePageLimit,
  } = useFilterParams();
  const [searchParams] = useSearchParams();
  const { page, search, limit } = getSearchParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createEmployee({ queryClient }));

  const variables = useMutationState({
    filters: { mutationKey: [QueryKeys.EMPLOYEES], status: "pending" },
    select: (mutation: Mutation<unknown, Error, unknown, unknown>) =>
      mutation.state.variables,
  }) as TEmployeeInputs[];
  const errorVariables = useMutationState({
    filters: { mutationKey: [QueryKeys.EMPLOYEES], status: "error" },
    select: (mutation: Mutation<unknown, Error, unknown, unknown>) =>
      mutation.state.variables,
  }) as TEmployeeInputs[];

  const status = useMutationState({
    filters: { mutationKey: [QueryKeys.EMPLOYEES] },
    select: (mutation: Mutation<unknown, Error, unknown, unknown>) =>
      mutation.state.status,
  });

  console.log(status);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: Number(limit),
      },
    },
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
  useEffect(() => {
    table.setPageSize(Number(limit));
  }, [table, limit]);
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
            options={["groupOptions", "groupOptions2", "grpsda2"]}
          >
            Designations
          </FacetedFilterButton>
          {/* Reset */}
          {searchParams.size > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                handleResetParams();
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              Reset
              <X size={IconProperties.SIZE} className="ml-2" />
            </Button>
          )}
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
            <TableRow className={`h-12 max-h-12 relative `}>
              {isMutating > 0 && variables.length && (
                <>
                  <TableCell key={variables[0].employeeId}>
                    {variables[0].employeeId}
                  </TableCell>
                  <TableCell key={variables[0].firstName}>
                    {variables[0].lastName} {variables[0].firstName}{" "}
                    {variables[0].middleName}
                  </TableCell>
                  <TableCell key={variables[0].age}>
                    {variables[0].age}
                  </TableCell>
                  <div className="flex items-center justify-center bg-muted/80 gap-2 absolute inset-0">
                    <Badge className="hover:cursor-default">
                      Adding your data.
                    </Badge>
                  </div>
                </>
              )}
              {status[0] === "error" && !isMutating && (
                <>
                  {/* bg-red-200 text-red-700 font-bold */}
                  <TableCell key={errorVariables[0].employeeId}>
                    {errorVariables[0].employeeId}
                  </TableCell>
                  <TableCell key={errorVariables[0].lastName}>
                    {errorVariables[0].lastName} {errorVariables[0].firstName}{" "}
                    {errorVariables[0].middleName}
                  </TableCell>
                  <TableCell key={errorVariables[0].age}>
                    {errorVariables[0].age}
                  </TableCell>
                  <div className="flex items-center justify-center bg-muted/80 gap-2 absolute inset-0">
                    <Badge
                      variant="destructive"
                      className="hover:cursor-default"
                    >
                      There is a problem adding your data.
                    </Badge>
                    <Button
                      variant="outline"
                      size="xs"
                      className="font-semibold my-1 ml-2"
                      onClick={() =>
                        mutate({
                          ...errorVariables[0],
                          age: Number(errorVariables[0].age),
                        })
                      }
                    >
                      Retry
                    </Button>
                  </div>
                </>
              )}

              {/* <TableCell colSpan={columns.length}>
                {isMutating > 0 && (
                  <span className="animate-pulse border border-white/30 absolute flex items-center justify-center inset-0 w-full h-full bg-primary/30">
                    <span className="text-green-500">Adding data...</span>
                  </span>
                )}
              </TableCell> */}
            </TableRow>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="h-12 max-h-12"
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
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              handlePageLimit(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
