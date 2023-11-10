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

function PunchInButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="bg-white text-secondary-foreground w-full mt-0"
        >
          Punch In
        </Button>
      </DialogTrigger>
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
            Punch in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PunchInButton;
