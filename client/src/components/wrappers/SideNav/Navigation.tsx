import { Link, Outlet } from "react-router-dom";
import BFARLogo from "../../ui/logo";
import BfarHeading from "../../ui/bfar-heading";
import { Links } from "@/types";
import { Menu } from "lucide-react";
import { useTheme } from "../../context/theme-provider";
import { createContext, useContext, useState } from "react";
import NavLinkLists from "./nav-linklists";
import NavAvatar from "./nav-avatar";

type TNavigationContext = {
  isMenuOpen: boolean;
  handleMenuOpen: () => React.SetStateAction<boolean>;
  overViewState: boolean;
  handleOverViewState: () => React.SetStateAction<boolean>;
  employeeState: boolean;
  handleEmployeeState: () => React.SetStateAction<boolean>;
};

const NavigationContext = createContext<TNavigationContext | null>(null);

function Navigation() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [overViewState, setOverViewState] = useState(true);
  const [employeeState, setEmployeeState] = useState(true);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOverViewState = () => {
    setOverViewState(!overViewState);
  };
  const handleEmployeeState = () => {
    setEmployeeState(!employeeState);
  };

  const value = {
    isMenuOpen,
    handleMenuOpen,
    overViewState,
    handleOverViewState,
    employeeState,
    handleEmployeeState,
  } as TNavigationContext;
  // const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <NavigationContext.Provider value={value}>
      <div className={`flex flex-col md:flex-row h-full`}>
        <nav
          className={`
        w-full top-0 pt-6 md:w-64 md:pt-0 md:sticky md:top-0
        flex flex-col justify-between `}
        >
          <div className="px-6">
            <div className="flex justify-between items-center mb-6">
              <Link to={Links.DASHBOARD}>
                <div className="flex items-center gap-2">
                  <BFARLogo cn="w-20 h-18" />
                  <BfarHeading sizeClass="text-2xl" />
                </div>
              </Link>

              <Menu
                size={24}
                strokeWidth={1}
                className="md:hidden mr-2 hover:cursor-pointer"
                onClick={handleMenuOpen}
              />
            </div>

            {/* Always show menu on desktop mode */}
            {/* Desktop Links */}
            <NavLinkLists className="hidden md:block my-8 " />
          </div>

          {/* For Desktop Avatar*/}
          <NavAvatar />

          {/* For Mobile Links And Avatar*/}
          {isMenuOpen && (
            <div
              className={`block md:hidden absolute top-[7em] w-full ${
                theme === "light" ? "bg-muted" : "bg-background"
              } h-full`}
            >
              <NavLinkLists className="md:block mb-8 px-6" />
              <NavAvatar />
            </div>
          )}
        </nav>
        <main
          className={`flex-grow h-full rounded-lg shadow-md mx-6 md:mx-0 ${
            theme === "light" ? "bg-background" : "bg-muted"
          }`}
        >
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

export default Navigation;
