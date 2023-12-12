import React, { useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command";

import { FormControl } from "./form";
import { Input } from "./input";
import { useQuery } from "@tanstack/react-query";
import debounce from "debounce";
import { IconProperties } from "@/types/common";
import { Loader2 } from "lucide-react";
import { AxiosResponse } from "axios";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import GroupContainer from "../pages/admin/employees/ui/group-container";
import { ControllerRenderProps } from "react-hook-form";
import GroupItem from "./group-item";
import DataTablePaginationNoBtn from "./data-table-pagination-nobtn";

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
};

// TODO: revision of popup command, think of a better way to implement this component
// TODO: travelpass delete function is not working, it says 404 not found even though the id is correct

function PopoverCommandQuery({
  label,
  selected,
  commandItemRender,
  getItem,
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
  const selectedItem = itemData.find(
    (d: TDataFields) => d.id === selected.value
  );
  const [selectedData, setSelectedData] = React.useState<TDataFields | null>(
    itemData[0]
  );
  const detailsSelect = useRef<HTMLSpanElement>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormControl>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              " justify-between text-xs ",
              !selectedItem?.name && "text-muted-foreground"
            )}
          >
            {selectedItem ? (
              selectedItem.id
            ) : (
              <span>Select {label ? label : "Item"}</span>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
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
            <Input
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
              <CommandEmpty className="text-xs p-4 text-center">
                No {label ? label : "item"} found.
              </CommandEmpty>
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
                    onSelect={() => setSelectedData(d)}
                  >
                    <div
                      className={`flex items-center justify-center text-xs mr-2 w-4 h-4 rounded-full border text-white ${
                        d.id === selectedData?.id
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
          {selectedData && (
            <GroupContainer
              groupActions={
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setSelectedData(null);
                      selected.onChange("");
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => {
                      selected.onChange(selectedData.id);
                      setOpen(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              }
            >
              {Object.keys(selectedData).map((key) => {
                // Return null for keys with object values
                return (
                  <GroupItem
                    detailsSelect={detailsSelect}
                    selectedItem={selectedData}
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
