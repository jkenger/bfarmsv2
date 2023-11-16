import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";

function Leaves() {
  return (
    <>
      <Main.Header>
        <Main.Heading title="Leaves">
          <Input
            id="search"
            placeholder="Search"
            className="lg:w-auto justify-start text-left font-normal"
          />
        </Main.Heading>
      </Main.Header>
    </>
  );
}

export default Leaves;
