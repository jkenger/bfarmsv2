import BfarHeading from "@/components/ui/bfar-heading";
import BFARLogo from "@/components/ui/logo";
import { Links } from "@/types/common";
import { Link } from "react-router-dom";
import NavAvatar from "./nav-avatar";
import { Menu } from "lucide-react";
import { useNavigation } from "./Navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronLeft } from "lucide-react";
import { IconProperties } from "@/types/common";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

function TopNav() {
  const { handleMenuOpen } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`border-b sticky md:py-3 top-0 z-30 w-full md:flex backdrop-blur-xl backdrop-saturate-150 bg-background/60 items-center `}
    >
      <div className="flex w-full justify-between items-center py-4 md:py-0 md:ml-4">
        <Link to={Links.DASHBOARD}>
          <div className="flex items-center gap-2">
            <BFARLogo cn="w-16 h-14" />
            <BfarHeading sizeClass="text-xl" />
          </div>
        </Link>

        <div className="md:hidden flex items-center ">
          {/* <ModeToggle /> */}
          <NavAvatar />
          <Menu
            size={24}
            strokeWidth={1}
            className=" mr-2 hover:cursor-pointer"
            onClick={handleMenuOpen}
          />
        </div>

        <div className="hidden md:flex items-center gap-2 md:mr-4">
          <ModeToggle />
          <NavAvatar />
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-semibold tracking-wide">
                    John Doe
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Super Admin
                  </span>
                  <span className="text-muted-foreground text-xs">
                    ID: 0200003000000
                  </span>
                </div>
                <span>
                  <ChevronLeft
                    size={IconProperties.SIZE}
                    className={`${
                      isOpen && "-rotate-90 "
                    } transform transition-all`}
                  />
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="text-xs p-0 bg-transparent rounded-md">
              <div className="flex justify-between items-center bg-foreground text-background   py-6 px-4 rounded-md">
                <div className="flex flex-col px-2">
                  <span className="text-xs font-semibold tracking-wide">
                    John Doe
                  </span>
                  <span className="text-muted-background text-xs">
                    Super Admin
                  </span>
                  <span className=" text-xs text-muted-background">
                    0200003000000
                  </span>
                </div>
                <div>
                  <BFARLogo cn="w-14 h-12" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
