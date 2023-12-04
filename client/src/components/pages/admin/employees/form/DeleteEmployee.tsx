import React from "react";

import DeleteDialog from "@/components/ui/delete-dialog";
import { useEmployeeQuery } from "../providers/EmployeeQueryProvider";

type Props = {
  data: TAdminForms;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  children?: React.ReactNode;
};
function DeleteEmployee({
  open,
  onOpen,
  data,
  trigger = true,
  children,
}: Props) {
  const { deleteMutation } = useEmployeeQuery();
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

export default DeleteEmployee;
