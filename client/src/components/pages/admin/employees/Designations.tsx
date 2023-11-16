import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";

function Designations() {
  return (
    <>
      <Main.Header>
        <Main.Heading title="Designations">
          <Input
            id="search"
            placeholder="Search"
            className="w-full md:w-auto justify-start text-left font-normal"
          />
        </Main.Heading>
      </Main.Header>
    </>
  );
}

export default Designations;
