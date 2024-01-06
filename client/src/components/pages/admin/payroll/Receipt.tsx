import Main from "@/components/wrappers/Main";
import { QueryClient } from "@tanstack/react-query";
import { Await, Params, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import TableFallBack from "@/components/ui/table-fallback";
import Error from "../../Error";
import ReceiptTable from "./tables/ReceiptTable";
import { getReceipts } from "./api/receipt.api";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    return defer({
      data: queryClient.ensureQueryData(
        getReceipts({ type: "paginated", payrollId: params.id })
      ),
    });
  };

function Receipt() {
  const { data: initialData } = useLoaderData() as { data: TDataFields };

  const titlePage = "Receipts";
  return (
    <>
      <Main.Header>
        <Main.Heading title={titlePage} access="admin"></Main.Heading>
      </Main.Header>
      <Main.Content>
        <Suspense fallback={<TableFallBack />}>
          <Await resolve={initialData} errorElement={<Error />}>
            <ReceiptTable />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Receipt;
