import React from "react";

import DeleteDialog from "@/components/ui/delete-dialog";

import { useLeaveTypeQuery } from "../providers/LeaveTypeQueryProviders";

type Props = {
  data: TDataFields;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  children?: React.ReactNode;
};
function DeleteLeaveType({
  open,
  onOpen,
  data,
  trigger = true,
  children,
}: Props) {
  const { deleteMutation } = useLeaveTypeQuery();
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

export default DeleteLeaveType;
