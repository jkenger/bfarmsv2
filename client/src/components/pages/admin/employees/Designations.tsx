import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { getDesignations } from "./api/designation.api";
import { QueryClient } from "@tanstack/react-query";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Error from "../../Error";
import TableFallBack from "@/components/ui/table-fallback";
import DesignationTable from "./DesignationTable";
import { designationColumns } from "./table-columns/designation.columns";

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
        <Main.Heading title="Designations" access="admin">
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />
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
