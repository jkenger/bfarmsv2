import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { Plus } from "lucide-react";

function Deductions() {
  return (
    <Main>
      <Main.Header>
        <Main.Heading
          title="Deductions"
          mobileButton={
            <Button
              type="button"
              variant="ghost"
              className="text-primary self-start flex lg:hidden"
            >
              <Plus />
            </Button>
          }
        >
          <Input
            id="search"
            placeholder="Search"
            className="lg:w-auto justify-start text-left font-normal"
          />
          <Button
            type="button"
            variant="ghost"
            className="text-primary self-start hidden lg:flex gap-2"
          >
            <Plus />
            <span>Create New Deductions</span>
          </Button>
        </Main.Heading>
      </Main.Header>
    </Main>
  );
}

export default Deductions;
