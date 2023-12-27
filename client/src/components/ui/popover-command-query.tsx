import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Loader2 } from "lucide-react";
import { AxiosResponse } from "axios";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import GroupContainer from "../pages/admin/employees/ui/group-container";
import { ControllerRenderProps } from "react-hook-form";
import GroupItem from "./group-item";
import DataTablePaginationNoBtn from "./data-table-pagination-nobtn";
import { Link } from "react-router-dom";
import { Skeleton } from "./skeleton";

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
  groupSelect?: Array<keyof TDataFields>;
};

// TOFIX: empty state for command query is not working

function PopoverCommandQuery({
  label,
  selected,
  commandItemRender,
  getItem,
  ifEmptyLink,
  displayField = "id",
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

  const itemData = useMemo(
    () => (data?.data.data ? data.data.data : []),
    [data?.data.data]
  );
  const numOfPages = data?.data.numOfPages ? data.data.numOfPages : 0;
  const [selectedItem, setSelectedItem] = useState<TDataFields>();

  useEffect(() => {
    if (selected.value) {
      setSelectedItem(
        itemData.find((item: TDataFields) => item.id === selected.value)
      );
    }
  }, [selected.value, itemData]);

  const detailsSelect = useRef<HTMLSpanElement>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {isPending && (
        <Skeleton className="w-24 h-8" style={{ display: "inline-block" }} />
      )}
      {isSuccess && (
        <FormControl>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                " justify-between text-xs ",
                !selectedItem?.id && "text-muted-foreground"
              )}
            >
              {selectedItem?.id ? (
                selectedItem[displayField]
              ) : (
                <span>Select {label ? label : "Item"}</span>
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </FormControl>
      )}

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
                    onSelect={() => setSelectedItem(d)}
                  >
                    <div
                      className={`flex items-center justify-center text-xs mr-2 w-3 h-3 rounded-full border text-white ${
                        selectedItem?.id === d.id
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    ></div>
                    {commandItemRender(d)}
                  </CommandItem>
                ))}
              <DataTablePaginationNoBtn
                numOfPages={numOfPages}
                pageChange={{ page, handlePageChange: handleCommandPageChange }}
              />
            </CommandGroup>
          </div>
          {selectedItem && (
            <GroupContainer
              groupActions={
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setSelectedItem(undefined);
                      selected.onChange(null);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      selected.onChange(selectedItem.id);
                      setOpen(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              }
            >
              {Object.keys(selectedItem).map((key) => {
                // Return null for keys with object values
                return groupSelect ? (
                  groupSelect.includes(key as keyof TDataFields) ? (
                    <GroupItem
                      detailsSelect={detailsSelect}
                      selectedItem={selectedItem}
                      objectKey={key}
                      key={key}
                    />
                  ) : null
                ) : (
                  <GroupItem
                    detailsSelect={detailsSelect}
                    selectedItem={selectedItem}
                    objectKey={key}
                    key={key}
                  />
                );
              })}
            </GroupContainer>
          )}
        </CommandDialog>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverCommandQuery;
