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

function PunchOutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="w-full">
          Punch Out
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Time out</DialogTitle>
          <DialogDescription>
            Scan the your rfid or input your employee id below to punch out.
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label htmlFor="id" className="sr-only">
            Id
          </Label>
          <Input id="id" placeholder="00-00" />
        </div>
        <DialogFooter className="sm:justify-end">
          <Button type="button">Punch out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PunchOutButton;
