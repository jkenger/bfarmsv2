import { ColumnDef } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";

import MutationSheet from "@/components/ui/btn-add-sheet";
import { buttonVariants } from "@/components/ui/button";
import { AxiosError } from "axios";
import DataTableProvider from "@/components/context/data-table-provider";
import { SheetTrigger } from "@/components/ui/sheet";
import { getTravelpass } from "../api/travelpass.api";
import EditTravelpass from "../form/travelpass/EditTravelpass";
import AddTravelpass from "../form/travelpass/AddTravelpass";
import { useQueryProvider } from "@/components/context/query-provider";
import FacetedFilterButton from "@/components/ui/data-table-faceted-filter";
import useFilterParams from "@/components/hooks/useFilterParams";
type Props = {
  columns: ColumnDef<TDataFields>[];
};

function TravelpassTable({ columns }: Props) {
  // useQuery for fetching employee is needed here
  const {
    data: res,
    isError,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useQuery(getTravelpass({ type: "paginated" }));

  const data = res?.data.data ? res.data.data : [];
  const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  // reset page to 1 if data length is less than numOfPages

  const { createMutation, deleteMutation, editMutation } = useQueryProvider();
  const { handleTravelTypeChange } = useFilterParams();
  const editMutationError = editMutation?.error as AxiosError;
  const createMutationError = createMutation?.error as AxiosError;
  const pageTitle = "Travelpass";
  return (
    <>
      {isSuccess && (
        <DataTableProvider<TDataFields, string>
          value={{
            columns: columns,
            data,
            isFetching,
            numOfPages,
            dataReloader: refetch,
            mutations: {
              create: createMutation,
              edit: editMutation,
              delete: deleteMutation,
            },
            onEditErrorAction: (
              <MutationSheet
                triggerElement={
                  <SheetTrigger
                    className={
                      buttonVariants({
                        variant: "outline",
                        size: "xs",
                      }) + " font-semibold my-1 ml-2"
                    }
                  >
                    Retry
                  </SheetTrigger>
                }
                title="Update data in"
                table={pageTitle}
                error={editMutationError?.response?.data as string}
              >
                <EditTravelpass toEditItem={editMutation?.variables} />
              </MutationSheet>
            ),
            onCreateErrorAction: (
              <MutationSheet
                triggerElement={
                  <SheetTrigger
                    className={
                      buttonVariants({
                        variant: "outline",
                        size: "xs",
                      }) + " font-semibold my-1 ml-2"
                    }
                  >
                    Retry
                  </SheetTrigger>
                }
                title="Update data in"
                table={pageTitle}
                error={createMutationError?.response?.data as string}
              >
                <AddTravelpass toEditItem={createMutation?.variables} />
              </MutationSheet>
            ),
            facetedFilterButtons: (
              <FacetedFilterButton
                onSelectedChange={handleTravelTypeChange}
                // filter={jobStatusfilter}
                options={data.map((travel: TDataFields) => travel.typeOf)}
              >
                Travel Type
              </FacetedFilterButton>
            ),
          }}
        >
          <DataTable />
        </DataTableProvider>
      )}
      {isError && <div className="relative">{error.message}</div>}
    </>
  );
}

export default TravelpassTable;
