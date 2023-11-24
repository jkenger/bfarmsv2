import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

type Props = {
  open?: boolean;
  onOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  isDeleting?: boolean;
};

function DeleteDialog({ open, onOpen, onDelete, isDeleting }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="text-primary" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
