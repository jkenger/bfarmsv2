import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./button";

function CreateAttendanceBtn({
  actionButton,
}: {
  actionButton: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{actionButton}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-primary text-primary-foreground">
        <DialogHeader>
          <DialogTitle>Time in</DialogTitle>
          <DialogDescription className="text-white">
            Scan your rfid or input your employee id below to punch in.
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="id" className="sr-only">
            Id
          </Label>
          <Input
            className="bg-secondary text-secondary-foreground"
            id="id"
            defaultValue=""
            placeholder="00-00"
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="button" variant="secondary">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAttendanceBtn;
