import { ColumnDef } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";

import MutationSheet from "@/components/ui/btn-add-sheet";
import { buttonVariants } from "@/components/ui/button";
import { AxiosError } from "axios";
import DataTableProvider from "@/components/context/data-table-provider";
import { SheetTrigger } from "@/components/ui/sheet";
import { getPayrollGroups } from "../api/payrollGroups.api";
import EditPayrollGroup from "../form/payrollgroups/EditPayrollGroup";
import AddPayrollGroups from "../form/payrollgroups/AddPayrollGroup";
import { useQueryProvider } from "@/components/context/query-provider";
type Props = {
  columns: ColumnDef<TDataFields>[];
};

function PayrollGroupsTable({ columns }: Props) {
  // useQuery for fetching employee is needed here
  const {
    data: res,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery(getPayrollGroups({ type: "paginated" }));

  const data = res?.data.data ? res.data.data : [];
  const numOfPages = res?.data.numOfPages ? res.data.numOfPages : 0;
  // reset page to 1 if data length is less than numOfPages
  console.log(data);
  const { createMutation, deleteMutation, editMutation } = useQueryProvider();
  const editMutationError = editMutation?.error as AxiosError;
  const createMutationError = createMutation?.error as AxiosError;
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
                table="Designations"
                error={editMutationError?.response?.data as string}
              >
                <EditPayrollGroup toEditItem={editMutation?.variables} />
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
                table="Designations"
                error={createMutationError?.response?.data as string}
              >
                <AddPayrollGroups toEditItem={createMutation?.variables} />
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

export default PayrollGroupsTable;
