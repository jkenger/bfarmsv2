import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { useLoaderData } from "react-router-dom";
import fetch from "@/lib/utils";
import { DataTable } from "../payments/data-table";
import { TEmployees, employeeColumns } from "./employee.columns";

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
        <Main.Heading title="Employees">
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />
        </Main.Heading>
      </Main.Header>
      <Main.Content>
        {data ? (
          <DataTable columns={employeeColumns} data={data} />
        ) : (
          <p>No Data</p>
        )}
      </Main.Content>
    </>
  );
}

export default Employees;
