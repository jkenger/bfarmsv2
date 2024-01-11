import Main from "@/components/wrappers/Main";
import { QueryClient } from "@tanstack/react-query";
import { Await, Params, defer, useLoaderData } from "react-router-dom";
import { Suspense, useState } from "react";
import TableFallBack from "@/components/ui/table-fallback";
import Error from "../../Error";
import { IconProperties, Links } from "@/types/common";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSheets } from "./api/sheets.api";
import SheetTable from "./tables/SheetTable";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    return defer({
      data: queryClient.ensureQueryData(
        getSheets({ type: "paginated", id: params.id ?? "" })
      ),
      id: params.id,
    });
  };

function Card() {
  const { data: initialData, id } = useLoaderData() as {
    data: TDataFields;
    id: string;
  };

  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <>
      <Main.Header>
        <Main.BreadCrumbs
          level={[
            { title: "Time Cards", route: Links.TIME_CARDS },
            { title: `Card ${id}`, route: "" },
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
            <SheetTable onEdit={editMode} onEditMode={handleEditMode} />
          </Await>
        </Suspense>
      </Main.Content>
    </>
  );
}

export default Card;
