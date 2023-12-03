import Main from "@/components/wrappers/Main";
import { useLoaderData, defer, Await } from "react-router-dom";

import { employeeColumns } from "./table-columns/employee.columns";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

import MutationSheet from "@/components/ui/btn-add-sheet";
import AddEmployee from "./form/AddEmployee";
import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import Error from "../../Error";
import { getEmployees } from "./api/employee.api";
import EmployeeTable from "./Table";
import { IconProperties } from "@/types/common";
import TableFallBack from "@/components/ui/table-fallback";
import DataTableHistory from "@/components/ui/data-table-history";
import { useEmployee } from "./providers/EmployeeProvider";
import ActivityCard from "./ui/activity-card";

// import BreadCrumb from "@/components/wrappers/nav/bread-crumb";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getEmployees()),
  });
};

function Employees() {
  const { data: initialData } = useLoaderData() as { data: TEmployees };
  const { createdActivities, deletedActivities, editedActivities } =
    useEmployee();

  console.log(createdActivities);
  return (
    <>
      <Main.Header>
        {/* <Main.BreadCrumbs>
          <BreadCrumb title="Employees" />
        </Main.BreadCrumbs> */}
        <Main.Heading
          title="Employees"
          access="Admin"
          mobileButton={
            <MutationSheet
              triggerElement={
                <div
                  className={
                    buttonVariants({
                      variant: "default",
                      size: "sm",
                    }) + " self-start lg:flex gap-2 text-xs"
                  }
                >
                  {" "}
                  <Plus
                    size={IconProperties.SIZE}
                    strokeWidth={IconProperties.STROKE_WIDTH}
                  />
                </div>
              }
              title="Add new data to"
              table="Employees"
            >
              <AddEmployee />
            </MutationSheet>
          }
        >
          {/* Create New Employee Sheet*/}

          <MutationSheet
            triggerElement={
              <div
                className={
                  buttonVariants({
                    variant: "default",
                    size: "sm",
                  }) + " self-start hidden lg:flex gap-2 text-xs"
                }
              >
                <Plus
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
                <span>Create new</span>
              </div>
            }
            title="Add new data to"
            table="Employees"
          >
            <AddEmployee />
          </MutationSheet>
          {/* Activities */}
          <DataTableHistory
            render={{
              edited: editedActivities.length ? (
                editedActivities?.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    type="edited"
                    activity={activity}
                  />
                ))
              ) : (
                <div className="text-sm text-muted- my-2 p-4 flex items-center justify-center text-muted-foreground border border-dashed">
                  No recent activities
                </div>
              ),

              deleted: deletedActivities.length ? (
                deletedActivities?.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    type="deleted"
                    activity={activity}
                  />
                ))
              ) : (
                <div className="text-sm text-muted- my-2 p-4 flex items-center justify-center text-muted-foreground border border-dashed">
                  No recent activities
                </div>
              ),
              created: createdActivities.length ? (
                createdActivities?.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    type="created"
                    activity={activity}
                  />
                ))
              ) : (
                <div className="text-sm text-muted- my-2 p-4 flex items-center justify-center text-muted-foreground border border-dashed">
                  No recent activities
                </div>
              ),
            }}
          />
        </Main.Heading>
      </Main.Header>
      <Main.Content>
        <Suspense fallback={<TableFallBack />}>
          <Await resolve={initialData} errorElement={<Error />}>
            {(data) => (
              <EmployeeTable
                employeeColumns={employeeColumns}
                initialData={data}
              />
            )}
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Employees;
