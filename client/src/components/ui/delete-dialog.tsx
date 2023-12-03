import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  trigger?: boolean;
  children?: React.ReactNode;
};

function DeleteDialog({
  open,
  onOpen,
  onDelete,
  trigger = true,
  children = "Delete",
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      {trigger && (
        <DialogTrigger>
          <Button variant="outline" size="xs">
            {children}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
