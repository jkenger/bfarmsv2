import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/employee.api";
import DeleteDialog from "@/components/ui/delete-dialog";

type Props = {
  id?: string;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
function DeleteEmployee({ open, onOpen, id }: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation(deleteEmployee({ queryClient }));

  function handleDelete() {
    mutate(id ?? "");
    if (!isPending) {
      onOpen?.(false);
    }
  }

  return (
    <DeleteDialog
      open={open}
      onOpen={onOpen}
      onDelete={handleDelete}
      isDeleting={isPending}
    />
  );
}

export default DeleteEmployee;
