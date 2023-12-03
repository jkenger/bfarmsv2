import { ColumnDef } from "@tanstack/react-table";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "./api/employee.api";
import { DataTable } from "@/components/ui/data-table";

import { useEmployee } from "./providers/EmployeeProvider";
import MutationSheet from "@/components/ui/btn-add-sheet";
import { Button } from "@/components/ui/button";
import EditEmployee from "./form/EditEmployee";
import AddEmployee from "./form/AddEmployee";
type Props = {
  employeeColumns: ColumnDef<TDataFields>[];
  initialData: TEmployees[];
};

export type TEmployeeTableContext = {
  data: TDataFields[];
  numOfPages: number;
};

const initialState = {
  data: [],
  numOfPages: 0,
};

const EmployeeTableContext = createContext<TEmployeeTableContext>(initialState);
function EmployeeTable({ employeeColumns }: Props) {
  const {
    data: res,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery(getEmployees());
  const data = res ? res.data.data : [];
  const numOfPages = res ? res.data.numOfPages : 0;
  // reset page to 1 if data length is less than numOfPages

  const value: TEmployeeTableContext = {
    data,
    numOfPages,
  };

  const { createMutation, deleteMutation, editMutation } = useEmployee();

  return (
    <EmployeeTableContext.Provider value={value}>
      {isSuccess && (
        <div className="relative">
          <DataTable<TDataFields, string>
            columns={employeeColumns}
            data={data}
            numOfPages={numOfPages}
            dataReloader={refetch}
            mutations={{
              create: createMutation,
              edit: editMutation,
              delete: deleteMutation,
            }}
            onEditErrorAction={
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
                table="Employees"
                error={
                  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                  editMutation.error?.response?.data
                }
              >
                <EditEmployee toEditItem={editMutation.variables} />
              </MutationSheet>
            }
            onCreateErrorAction={
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
                table="Employees"
                error={
                  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                  createMutation.error?.response?.data
                }
              >
                <AddEmployee toEditItem={createMutation.variables} />
              </MutationSheet>
            }
            // deleteElement={<DeleteEmployee />}
            // editElement={<EditEmployee />}
          />
        </div>
      )}
      {isError && <div className="relative">{error.message}</div>}
    </EmployeeTableContext.Provider>
  );
}

export function useEmployeeTable() {
  const context = useContext(EmployeeTableContext);
  if (context === undefined) {
    throw new Error(
      "useEmployeeTable must be used within a EmployeeTableContext"
    );
  }
  return context;
}

export default EmployeeTable;
