import React from "react";

import DeleteDialog from "@/components/ui/delete-dialog";
import { useEmployeeQuery } from "../providers/EmployeeQueryProvider";

type Props = {
  id?: string;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  children?: React.ReactNode;
};
function DeleteEmployee({ open, onOpen, id, trigger = true, children }: Props) {
  const { deleteMutation } = useEmployeeQuery();
  function handleDelete() {
    deleteMutation.mutate(id as string);
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

export default DeleteEmployee;
