import BfarHeading from "@/components/ui/bfar-heading";
import BFARLogo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Links } from "@/types/common";
import { Link } from "react-router-dom";
import NavAvatar from "./nav-avatar";
import { Menu } from "lucide-react";
import { useNavigation } from "./Navigation";

function TopNav() {
  const { handleMenuOpen } = useNavigation();
  return (
    <nav
      className={`border-b sticky md:py-3 top-0 z-30 w-full md:flex backdrop-blur-xl backdrop-saturate-150 bg-background/60 items-center`}
    >
      <div className="flex w-full justify-between items-center px-6 py-4 md:py-0">
        <Link to={Links.DASHBOARD}>
          <div className="flex items-center gap-2">
            <BFARLogo cn="w-16 h-14" />
            <BfarHeading sizeClass="text-xl" />
          </div>
        </Link>
        <div className="md:hidden flex items-center ">
          <ModeToggle />
          <NavAvatar />
          <Menu
            size={24}
            strokeWidth={1}
            className=" mr-2 hover:cursor-pointer"
            onClick={handleMenuOpen}
          />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          <NavAvatar />
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
