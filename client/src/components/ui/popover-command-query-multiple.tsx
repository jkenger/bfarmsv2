import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandQueryInput,
} from "./command";

import { FormControl } from "./form";

import { useQuery } from "@tanstack/react-query";
import debounce from "debounce";
import { IconProperties, Links } from "@/types/common";
import { Check, Loader2 } from "lucide-react";
import { AxiosResponse } from "axios";
import { Button } from "./button";

import { ControllerRenderProps } from "react-hook-form";

import DataTablePaginationNoBtn from "./data-table-pagination-nobtn";
import { Link } from "react-router-dom";
import { Badge } from "./badge";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "./table";

type Props = {
  selected: ControllerRenderProps<TDataFields, any>;
  label?: string;
  commandItemRender: (d: TDataFields) => React.ReactNode;
  getItem: ({ type, customParams }: TGetQueryOptions) => {
    queryKey: string[];
    queryFn: () => Promise<AxiosResponse<any, any>>;
    placeholderData: <T>(previousData: T | undefined) => T | undefined;
    staleTime: number;
  };
  ifEmptyLink: Links;
  displayField?: keyof TDataFields;
  groupSelect?: string[];
};

// TOFIX: empty state for command query is not working

function PopoverCommandQueryMultiple({
  label,
  selected,
  commandItemRender,
  getItem,
  ifEmptyLink,
  groupSelect,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState("1");

  function handleCommandPageChange(page: number) {
    setPage(page.toString());
  }
  const params = { page, search };
  const { data, isPending, isSuccess } = useQuery(
    getItem({ type: "paginated", customParams: params })
  );

  const itemData = data?.data.data ? data.data.data : [];
  const numOfPages = data?.data.numOfPages ? data.data.numOfPages : 0;
  const [selectedItems, setSelectedItems] = useState(
    selected.value
      ? itemData.filter((item: TDataFields) =>
          selected.value.some(
            (selectedItem: TDataFields) => selectedItem.id === item.id
          )
        )
      : []
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormControl>
        <PopoverTrigger asChild>
          <div className="flex h-9">
            <span className="bg-secondary border flex items-center justify-center px-3 rounded-l-md hover:cursor-pointer">
              {selected.value ? selected.value.length : 0}
            </span>
            <Badge
              variant="outline"
              className="rounded-l-none border-l-0 rounded-r-md hover:cursor-pointer w-full hover:bg-secondary"
            >
              {" "}
              {selected.value?.length ? (
                label + "s selected"
              ) : (
                <span>Selected {label ? label : "Item"}</span>
              )}
            </Badge>
          </div>
        </PopoverTrigger>
      </FormControl>
      <PopoverContent className="p-0 border-0">
        {/* <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">{commandItems}</CommandGroup>
          </CommandList>
          <div className="mr-3">
            <DataTablePaginationNoBtn numOfPages={numOfPages} />
          </div>
        </CommandDialog> */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <div>
            <CommandQueryInput
              className="text-xs"
              placeholder="Search for an item"
              defaultValue={search}
              onChange={debounce((e) => {
                setSearch(e.target.value);
              }, 500)}
            />

            <CommandGroup
              heading={label + "s"}
              className="h-auto max-h-64 overflow-y-scroll"
            >
              {isSuccess && !itemData.length && (
                <span className="text-xs p-4 flex items-center justify-center w-full">
                  No {label ? label : "item"} found.{" "}
                  <span className="ml-1 text-primary underline">
                    <Link to={ifEmptyLink + "?ref=notfound"}>Add</Link>
                  </span>
                </span>
              )}
              {isPending && (
                <span className="w-full flex items-center justify-center py-4">
                  <Loader2
                    size={IconProperties.SIZE}
                    className="animate-spin"
                  />
                </span>
              )}
              {isSuccess &&
                itemData.map((d: TDataFields) => (
                  <CommandItem
                    value={d.id}
                    key={d.id}
                    className="text-xs"
                    onSelect={() => {
                      setSelectedItems((prev: TDataFields[]) => {
                        if (
                          prev &&
                          prev.some((item: TDataFields) => item.id === d.id)
                        ) {
                          return prev.filter(
                            (item: TDataFields) => item.id !== d.id
                          );
                        } else {
                          return prev ? [...prev, d] : [d];
                        }
                      });
                    }}
                  >
                    <div
                      className={`flex items-center justify-center text-xs w-3 h-3 rounded-sm border text-white mr-2 ${
                        selectedItems?.includes(d)
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      {selectedItems?.includes(d) && (
                        <Check size={IconProperties.SIZE_ICON} />
                      )}
                    </div>
                    {commandItemRender(d)}
                  </CommandItem>
                ))}
              <DataTablePaginationNoBtn
                numOfPages={numOfPages}
                pageChange={{ page, handlePageChange: handleCommandPageChange }}
              />
            </CommandGroup>
            {selectedItems && (
              <div className="p-3">
                <Table>
                  {selectedItems.length > 0 && (
                    <TableCaption className="mb-4 text-xs">
                      Selected {label ? label + "s" : "items"}
                    </TableCaption>
                  )}
                  <TableBody>
                    {!selectedItems.length && (
                      <TableRow>
                        <TableCell className="text-xs text-center">
                          <span className="text-muted-foreground ">
                            No {label ? label : "item"} selected.
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    {selectedItems.map((d: TDataFields) => (
                      <TableRow key={d.id}>
                        {Object.keys(d).map(
                          (key) =>
                            groupSelect?.includes(key as keyof TDataFields) && (
                              <TableCell key={key} className="">
                                <div className="flex flex-col">
                                  <p className="font-medium text-xs">
                                    {d[key as keyof TDataFields]}
                                  </p>
                                  <span className="text-muted-foreground capitalize text-xs">
                                    {key}
                                  </span>
                                </div>
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex w-full justify-end gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setSelectedItems([]);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      selected.onChange(selectedItems);
                      setOpen(false);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CommandDialog>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverCommandQueryMultiple;
