import Main from "@/components/wrappers/Main";
import { useLoaderData, defer, Await } from "react-router-dom";

import { employeeColumns } from "./employee.columns";
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
import useFilterParams from "@/components/hooks/useFilterParams";
import { Input } from "@/components/ui/input";
import debounce from "debounce";
import TableFallBack from "@/components/ui/table-fallback";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = Number(new URLSearchParams(url.search).get("page")) || 1;
    const limit = Number(new URLSearchParams(url.search).get("limit")) || 10;
    const search = new URLSearchParams(url.search).get("search") || "";
    const sp = new URLSearchParams(url.search).get("sp") || "";
    return defer({
      data: queryClient.ensureQueryData(
        getEmployees({ page, limit, search, sp })
      ),
    });
  };

function Employees() {
  const { data: initialData } = useLoaderData() as { data: TEmployees };
  const { handlePageChange, handleSearchChange } = useFilterParams();

  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Employees"
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
          {/* Search */}
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
            onChange={debounce((e) => {
              handleSearchChange(e.target.value);
              handlePageChange(1);
            }, 500)}
          />
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
