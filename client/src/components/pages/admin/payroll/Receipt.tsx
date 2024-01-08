import Main from "@/components/wrappers/Main";
import { QueryClient } from "@tanstack/react-query";
import { Await, Params, defer, useLoaderData } from "react-router-dom";
import { Suspense, useState } from "react";
import TableFallBack from "@/components/ui/table-fallback";
import Error from "../../Error";
import ReceiptTable from "./tables/ReceiptTable";
import { getReceipts } from "./api/receipt.api";
import { IconProperties, Links } from "@/types/common";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <>
      <Main.Header>
        <Main.BreadCrumbs
          level={[
            { title: "Payroll", route: Links.PAYROLL },
            { title: "Receipts", route: "" },
          ]}
          access="admin"
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={editMode}
            onClick={() => setEditMode(true)}
          >
            <Pencil size={IconProperties.SIZE} /> Edit Signatories
          </Button>
        </Main.BreadCrumbs>
      </Main.Header>
      <Main.Content>
        <Suspense fallback={<TableFallBack />}>
          <Await resolve={initialData} errorElement={<Error />}>
            <ReceiptTable onEdit={editMode} onEditMode={handleEditMode} />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Receipt;
