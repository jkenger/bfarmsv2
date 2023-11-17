import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { useLoaderData, defer, Await } from "react-router-dom";

import { TEmployees, employeeColumns } from "./employee.columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IconProperties } from "@/types";

import MutationSheet from "@/components/ui/mutation-sheet";
import EmployeeAddForm from "./form/EmployeeAddForm";
import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import Error from "../../Error";
import { getEmployees } from "./api/employee.api";
import EmployeeTable from "./Table";
import TableSkeleton from "@/components/ui/table-skeleton";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getEmployees()),
  });
};

function Employees() {
  const { data: initialData } = useLoaderData() as { data: TEmployees };

  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Employees"
          mobileButton={
            <MutationSheet
              triggerElement={
                <Plus
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                  className="text-primary"
                />
              }
              title="Add new data to"
              table="Employees"
            >
              <EmployeeAddForm />
            </MutationSheet>
          }
        >
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />

          <MutationSheet
            triggerElement={
              <Button
                type="button"
                variant="ghost"
                className="text-primary self-start hidden lg:flex gap-2 text-xs"
              >
                <Plus
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
                <span>Create New Employee</span>
              </Button>
            }
            title="Add new data to"
            table="Employees"
          >
            <EmployeeAddForm />
          </MutationSheet>
        </Main.Heading>
      </Main.Header>
      <Main.Content>
        <Suspense fallback={<TableSkeleton />}>
          <Await resolve={initialData} errorElement={<Error />}>
            <EmployeeTable employeeColumns={employeeColumns} />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Employees;
