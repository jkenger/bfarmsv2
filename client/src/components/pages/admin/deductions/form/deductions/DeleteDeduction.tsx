import React from "react";

import DeleteDialog from "@/components/ui/delete-dialog";

import { useDeductionQuery } from "../../providers/DeductionsQueryProviders";

type Props = {
  data: TDataFields;
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  children?: React.ReactNode;
};
function DeleteDeduction({
  open,
  onOpen,
  data,
  trigger = true,
  children,
}: Props) {
  const { deleteMutation } = useDeductionQuery();
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

export default DeleteDeduction;
