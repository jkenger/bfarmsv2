import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Main from "@/components/wrappers/Main";
import { IconProperties } from "@/types/common";
import { Plus } from "lucide-react";

function Holidays() {
  return (
    <>
      <Main.Header>
        <Main.Heading
          title="Holidays"
          mobileButton={
            <Button
              type="button"
              variant="ghost"
              className="text-primary self-start flex lg:hidden"
            >
              <Plus
                size={IconProperties.SIZE}
                strokeWidth={IconProperties.STROKE_WIDTH}
              />
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
            <Plus
              size={IconProperties.SIZE}
              strokeWidth={IconProperties.STROKE_WIDTH}
            />
            <span>Create New Holiday</span>
          </Button>
        </Main.Heading>
      </Main.Header>
    </>
  );
}

export default Holidays;
