import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { Form, useLoaderData } from "react-router-dom";
import fetch from "@/lib/utils";
import { DataTable } from "../../../ui/data-table";
import { TEmployees, employeeColumns } from "./employee.columns";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { IconProperties } from "@/types";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import MutationSheet from "@/components/ui/mutation-sheet";
import EmployeeAddForm from "./form/EmployeeAddForm";

export async function loader() {
  try {
    const { data } = await fetch.get("/admin/employees");
    return data as TEmployees[];
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "An unknown error occurred" };
  }
}

function Employees() {
  const { message: data } = useLoaderData() as { message: TEmployees[] };
  console.log(data);
  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Employees"
          mobileButton={
            <MutationSheet
              triggerElement={
                <Plus
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                  className="text-primary"
                />
              }
              title="Add new data to"
              table="Employees"
            >
              <EmployeeAddForm />
            </MutationSheet>
          }
        >
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />

          <MutationSheet
            triggerElement={
              <Button
                type="button"
                variant="ghost"
                className="text-primary self-start hidden lg:flex gap-2 text-xs"
              >
                <Plus
                  size={IconProperties.SIZE}
                  strokeWidth={IconProperties.STROKE_WIDTH}
                />
                <span>Create New Employee</span>
              </Button>
            }
            title="Add new data to"
            table="Employees"
          >
            <EmployeeAddForm />
          </MutationSheet>
        </Main.Heading>
      </Main.Header>
      <Main.Content>
        <DataTable columns={employeeColumns} data={data} />
        <DataTable columns={employeeColumns} data={data} />
      </Main.Content>
    </>
  );
}

export default Employees;
