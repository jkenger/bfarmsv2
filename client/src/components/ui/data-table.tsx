import {
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
import useFilterParams, { getSearchParams } from "../hooks/useFilterParams";
import { DataTableViewOptions } from "./data-table-view-options";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { RotateCw, X } from "lucide-react";
import { Button } from "./button";
import { IconProperties } from "@/types/common";
import debounce from "debounce";
import DataTableSearch from "./data-table-search";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  DataTableColumnStatusAdding,
  DataTableColumnStatusAddingFails,
  DataTableColumnStatusDelete,
  DataTableColumnStatusDeleteFails,
  DataTableColumnStatusEdit,
  DataTableColumnStatusEditFails,
} from "./data-table-column-status";
import { DataTableProps, useDataTable } from "../context/data-table-provider";

export function DataTable<TData extends TDataFields, TValue>() {
  const [columnVisibility, setColumnVisibility] =
    useLocalStorageState<VisibilityState>([], "columnVisibility");
  const isFetching = useIsFetching();
  const {
    handleSearchChange,
    handlePageChange,
    handleResetParams,
    handlePageLimit,
  } = useFilterParams();
  const [searchParams] = useSearchParams();
  const { page, search, limit } = getSearchParams();
  const {
    columns,
    data,
    numOfPages,
    dataReloader,
    mutations,
    onEditErrorAction,
    onCreateErrorAction,
    facetedFilterButtons,
  } = useDataTable() as DataTableProps<TData, TValue>;

  const table = useReactTable<TData>({
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

          {/* Faceted Filter Button */}
          {facetedFilterButtons}

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
              <TableRow key={headerGroup.id} className="[&>*:first-child]:pl-4">
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
            {/* Render every activity on query states */}
            {mutations?.create && (
              <>
                {mutations?.create.isPending && (
                  <TableRow
                    key={mutations?.create.submittedAt}
                    className="h-12 max-h12 relative"
                  >
                    <DataTableColumnStatusAdding />
                  </TableRow>
                )}

                {mutations?.create.isError && (
                  <TableRow
                    key={mutations?.create.submittedAt}
                    className="h-12 max-h12 relative"
                  >
                    <DataTableColumnStatusAddingFails
                      mutation={mutations.create}
                      action={onCreateErrorAction}
                    />
                  </TableRow>
                )}
              </>
            )}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={`h-12 max-h-12 relative $ext-card
                  `}
                  key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <>
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    </>
                  ))}

                  {mutations?.edit && mutations?.delete && (
                    <>
                      {mutations?.edit.isPending &&
                        mutations.edit.variables.id === row.original.id && (
                          <DataTableColumnStatusEdit
                            variables={mutations.edit.variables}
                          />
                        )}
                      {mutations?.edit.isError &&
                        mutations.edit.variables.id === row.original.id && (
                          <DataTableColumnStatusEditFails
                            mutation={mutations.edit}
                            action={onEditErrorAction}
                          />
                        )}

                      {mutations?.delete.isPending && (
                        <>
                          {mutations?.delete.variables.id ===
                            row.original.id && (
                            <DataTableColumnStatusDelete
                              variables={mutations?.delete.variables}
                            />
                          )}
                        </>
                      )}
                      {mutations?.delete.isError && (
                        <>
                          {mutations?.delete.variables.id ===
                            row.original.id && (
                            <DataTableColumnStatusDeleteFails
                              mutation={mutations.delete}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
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
