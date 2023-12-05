import { ColumnDef } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";

import MutationSheet from "@/components/ui/btn-add-sheet";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import DataTableProvider from "@/components/context/data-table-provider";
import { getDesignations } from "../api/designation.api";
import { useDesignationQuery } from "../providers/DesignationQueryProvider";
import AddDesignation from "../form/designation/AddDesignation";
import EditDesignation from "../form/designation/EditDesignation";
type Props = {
  columns: ColumnDef<TDataFields>[];
};

function DesignationTable({ columns }: Props) {
  // useQuery for fetching employee is needed here
  const {
    data: res,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery(getDesignations());

  const data = res?.data.data ? res.data.data : [];
  const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  // reset page to 1 if data length is less than numOfPages

  const { createMutation, deleteMutation, editMutation } =
    useDesignationQuery();
  const editMutationError = editMutation?.error as AxiosError;
  const createMutationError = createMutation?.error as AxiosError;
  return (
    <>
      {isSuccess && (
        <DataTableProvider<TDataFields, string>
          value={{
            columns: columns,
            data,
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
                  <Button
                    variant="outline"
                    size="xs"
                    className="font-semibold my-1 ml-2"
                  >
                    Retry
                  </Button>
                }
                title="Update data in"
                table="Designations"
                error={editMutationError?.response?.data as string}
              >
                <EditDesignation toEditItem={editMutation?.variables} />
              </MutationSheet>
            ),
            onCreateErrorAction: (
              <MutationSheet
                triggerElement={
                  <Button
                    variant="outline"
                    size="xs"
                    className="font-semibold my-1 ml-2"
                  >
                    Retry
                  </Button>
                }
                title="Update data in"
                table="Designations"
                error={createMutationError?.response?.data as string}
              >
                <AddDesignation toEditItem={createMutation?.variables} />
              </MutationSheet>
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

export default DesignationTable;
