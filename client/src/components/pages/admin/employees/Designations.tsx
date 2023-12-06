import Main from "@/components/wrappers/Main";
import { getDesignations } from "./api/designation.api";
import { QueryClient } from "@tanstack/react-query";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Error from "../../Error";
import TableFallBack from "@/components/ui/table-fallback";
import DesignationTable from "./tables/DesignationTable";
import { designationColumns } from "./table-columns/designation.columns";
import MutationSheet from "@/components/ui/btn-add-sheet";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { IconProperties } from "@/types/common";
import AddDesignation from "./form/designation/AddDesignation";
import { SheetTrigger } from "@/components/ui/sheet";

export const loader = (queryClient: QueryClient) => async () => {
  return defer({
    data: queryClient.ensureQueryData(getDesignations()),
  });
};

function Designations() {
  const { data: initialData } = useLoaderData() as { data: TDataFields };
  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Designations"
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
              table="Designations"
            >
              <AddDesignation />
            </MutationSheet>
          }
        >
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
            table="Designations"
          >
            <AddDesignation />
          </MutationSheet>
        </Main.Heading>
      </Main.Header>
      <Main.Content>
        <Suspense fallback={<TableFallBack />}>
          <Await resolve={initialData} errorElement={<Error />}>
            <DesignationTable columns={designationColumns} />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Designations;
