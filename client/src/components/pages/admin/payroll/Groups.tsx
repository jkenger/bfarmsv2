import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";

function Groups() {
  return (
    <>
      <Main.Header>
        <Main.Heading title="Groups" />
        <Input
          id="search"
          placeholder="Search"
          className="w-full md:w-auto justify-start text-left font-normal"
        />
      </Main.Header>
    </>
  );
}

export default Groups;
