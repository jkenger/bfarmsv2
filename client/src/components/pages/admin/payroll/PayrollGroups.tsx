import Main from "@/components/wrappers/Main";
import { QueryClient } from "@tanstack/react-query";
import { Await, defer, useLoaderData } from "react-router-dom";
import { getPayrollGroups } from "./api/payrollGroups.api";
import { Suspense } from "react";
import TableFallBack from "@/components/ui/table-fallback";
import PayrollGroupsTable from "./tables/PayrollGroupsTable";
import { payrollGroupsColumns } from "./columns/payroll-group.columns";
import Error from "../../Error";
import MutationSheet from "@/components/ui/btn-add-sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IconProperties } from "@/types/common";
import AddPayrollGroups from "./form/payrollgroups/AddPayrollGroup";
import DataTableHistory from "@/components/ui/data-table-history";
import ActivityCard from "../employees/ui/activity-card";
import { useQueryProvider } from "@/components/context/query-provider";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getPayrollGroups({ type: "paginated" })),
  });
};
function PayrollGroups() {
  const { data: initialData } = useLoaderData() as { data: TDataFields };
  const { createdActivities, deletedActivities, editedActivities } =
    useQueryProvider();
  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Payroll Groups"
          access="admin"
          mobileButton={
            <MutationSheet
              triggerElement={
                <SheetTrigger
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
                </SheetTrigger>
              }
              title="Add new data to"
              table="Payroll Groups"
            >
              <AddPayrollGroups />
            </MutationSheet>
          }
        >
          {" "}
          <MutationSheet
            triggerElement={
              <SheetTrigger
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
              </SheetTrigger>
            }
            title="Add new data to"
            table="Payroll Groups"
          >
            <AddPayrollGroups />
          </MutationSheet>
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
            <PayrollGroupsTable columns={payrollGroupsColumns} />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default PayrollGroups;
