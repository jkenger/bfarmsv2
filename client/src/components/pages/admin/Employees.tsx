import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { useLoaderData } from "react-router-dom";
import fetch from "@/lib/utils";

export async function loader() {
  try {
    const { data } = await fetch.get("/admin/employees");
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "An unknown error occurred" };
  }
}

function Employees() {
  const loader = useLoaderData();
  console.log(loader);
  return (
    <Main>
      <Main.Header>
        <Main.Heading title="Employees">
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />
        </Main.Heading>
      </Main.Header>
    </Main>
  );
}

export default Employees;
