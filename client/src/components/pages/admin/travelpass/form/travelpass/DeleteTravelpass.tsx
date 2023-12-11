import React from "react";

import DeleteDialog from "@/components/ui/delete-dialog";
import { useTravelpassQuery } from "../../providers/TravelpassQueryProvider";

type Props = {
  data: TDataFields;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  children?: React.ReactNode;
};
function DeleteTravelpass({
  open,
  onOpen,
  data,
  trigger = true,
  children,
}: Props) {
  const { deleteMutation } = useTravelpassQuery();
  function handleDelete() {
    deleteMutation.mutate(data);
  }

  return (
    <DeleteDialog
      open={open}
      onOpen={onOpen}
      onDelete={handleDelete}
      trigger={trigger}
    >
      {children}
    </DeleteDialog>
  );
}

export default DeleteTravelpass;
