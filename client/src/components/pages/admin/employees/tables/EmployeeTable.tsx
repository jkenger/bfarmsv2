import { ColumnDef } from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../api/employee.api";
import { DataTable } from "@/components/ui/data-table";

import MutationSheet from "@/components/ui/btn-add-sheet";
import { buttonVariants } from "@/components/ui/button";
import EditEmployee from "../form/employee/EditEmployee";
import AddEmployee from "../form/employee/AddEmployee";
import { useEmployeeQuery } from "../providers/EmployeeQueryProvider";
import { AxiosError } from "axios";
import DataTableProvider from "@/components/context/data-table-provider";
import { SheetTrigger } from "@/components/ui/sheet";
import FacetedFilterButton from "@/components/ui/data-table-faceted-filter";
import useFilterParams from "@/components/hooks/useFilterParams";
import { getDesignations } from "../api/designation.api";
type Props = {
  employeeColumns: ColumnDef<TDataFields>[];
  initialData: TEmployees[];
};

function EmployeeTable({ employeeColumns }: Props) {
  // useQuery for fetching employee is needed here
  const {
    data: res,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery(getEmployees());
  const data = res ? res.data.data : [];
  const numOfPages = res ? res.data.numOfPages : 0;

  const { data: desData } = useQuery(getDesignations());

  const designationData = desData?.data.data ? desData.data.data : [];

  // reset page to 1 if data length is less than numOfPages
  const { createMutation, deleteMutation, editMutation } = useEmployeeQuery();
  const { handleDesignationChange, handleGroupChange } = useFilterParams();
  const editMutationError = editMutation?.error as AxiosError;
  const createMutationError = createMutation?.error as AxiosError;
  return (
    <>
      {isSuccess && (
        <DataTableProvider<TDataFields, string>
          value={{
            columns: employeeColumns,
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
                table="Employees"
                error={editMutationError?.response?.data as string}
              >
                <EditEmployee toEditItem={editMutation.variables} />
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
                table="Employees"
                error={createMutationError?.response?.data as string}
              >
                <AddEmployee toEditItem={createMutation.variables} />
              </MutationSheet>
            ),
            facetedFilterButtons: (
              <>
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
                  options={designationData.map((des: TDataFields) => des.name)}
                >
                  Designations
                </FacetedFilterButton>
              </>
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

export default EmployeeTable;
