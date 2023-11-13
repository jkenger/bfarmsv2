import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";

function Employees() {
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
