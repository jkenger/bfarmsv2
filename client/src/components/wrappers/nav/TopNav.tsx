import BfarHeading from "@/components/ui/bfar-heading";
import BFARLogo from "@/components/ui/logo";
import { Links, iconPropertiesDefault } from "@/types/common";
import { Link, useNavigate } from "react-router-dom";
import NavAvatar from "./nav-avatar";
import { LogOut, Menu, Settings } from "lucide-react";
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
import { useAuth } from "@/components/context/auth-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetch } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export const AccountInfo = () => {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between gap-2">
      <NavAvatar />
      <div className="flex flex-col items-start">
        <span className="text-xs font-semibold tracking-wide">
          {user?.email}
        </span>
        {/* <span className="font-semibold text-xs">
          {user?.user?.firstName || "No Name"}
        </span> */}
        <span className="text-muted-foreground text-xs">
          {user?.role?.length ? user?.role : "No Role"}
        </span>
        <span className="text-muted-foreground text-xs">
          {user?.user?.employeeId || "No Employee ID"}
        </span>
      </div>
    </div>
  );
};

function TopNav() {
  const { handleMenuOpen } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  async function handleLogout() {
    try {
      const result = await fetch.get(Links.LOGOUT);
      if (result.status === 200) {
        navigate(Links.LOGIN);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging out",
      });
    }
  }

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
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center ">
          {/* <ModeToggle /> */}
          <NavAvatar url={user?.user?.avatar} />
          <Menu
            size={24}
            strokeWidth={1}
            className=" mr-2 hover:cursor-pointer"
            onClick={handleMenuOpen}
          />
        </div>

        <div className="hidden md:flex items-center gap-2 md:mr-4 cursor-pointer">
          <ModeToggle />
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger>
              <div className="flex items-center gap-4">
                <AccountInfo />
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
            <PopoverContent className="text-xs p-0 bg-background rounded-md">
              <div className="relative flex justify-between items-center overflow-hidden  py-6 px-4 rounded-md">
                <AccountInfo />
                <BFARLogo cn="w-48 h-44 absolute -right-24 -bottom-20 opacity-0.5" />
              </div>
              {/* Menu */}
              <div className="flex flex-col gap-2 p-2">
                <Link
                  to={Links.ACCOUNT_SETTINGS}
                  className={buttonVariants({
                    variant: "ghost",
                  })}
                >
                  <span className="flex text-left w-full gap-2">
                    <Settings {...iconPropertiesDefault} />
                    Account Settings
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  type="button"
                  className="gap-2"
                  onClick={handleLogout}
                >
                  <span className="flex text-left w-full gap-2">
                    <LogOut {...iconPropertiesDefault} />
                    Logout
                  </span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
