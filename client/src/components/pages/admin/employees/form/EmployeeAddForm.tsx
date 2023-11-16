import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Form } from "react-router-dom";
import Group from "./group";

function EmployeeAddForm() {
  return (
    <Form className="mt-4 text-xs flex flex-col gap-4 text-muted-foreground">
      {/* Component input */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstName" className="text-muted-foreground">
          First Name
        </Label>
        <Input id="firstName" placeholder="column_data" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <div className="bg-card rounded-lg text-muted-foreground border p-4 flex flex-col gap-2">
          <p>
            The following id for this group will be{" "}
            <span className="text-primary">added</span>:{" "}
          </p>
          <div className="flex flex-col gap-4 items-start">
            <Group assignTo="id">023023020302032</Group>
            <Group assignTo="cluster"> NIFEP/BASIL</Group>
            <Group assignTo="project_name">
              CARPS FINGERLING PRODUCTION AND HATCHERY
              DEVELOPMENT/ADMINISTRATION AND OPERATION OF NIFTC/BASIL
            </Group>
          </div>
          <div className="space-x-2 mt-4">
            <Button variant="outline" size="sm" className="text-foreground">
              Edit group{" "}
            </Button>
            <Button variant="outline" size="sm" className="text-foreground">
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Payroll Group
          </Label>

          <p>Optional</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="self-start bg-background "
        >
          Add payroll group
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label htmlFor="firstName" className="">
            Designation
          </Label>

          <p>Optional</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className="self-start bg-background "
        >
          Add designation
        </Button>
      </div>
    </Form>
    
  );
}

export default EmployeeAddForm;
