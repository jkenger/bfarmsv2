import { Link, Outlet } from "react-router-dom";
import BFARLogo from "../../ui/logo";
import BfarHeading from "../../ui/bfar-heading";
import { Links } from "@/types";
import { Menu } from "lucide-react";
import { useTheme } from "../../context/theme-provider";
import { createContext, useContext, useState } from "react";
import NavLinkLists from "./nav-linklists";
import NavAvatar from "./nav-avatar";
import Main from "../Main";
import { ModeToggle } from "@/components/ui/mode-toggle";

type TNavigationContext = {
  isMenuOpen: boolean;
  handleMenuOpen: () => React.SetStateAction<boolean>;
  overViewState: boolean;
  handleOverViewState: () => React.SetStateAction<boolean>;
  employeeState: boolean;
  handleEmployeeState: () => React.SetStateAction<boolean>;
  dailyTimeRecordState: boolean;
  handleDailyTimeRecordState: () => React.SetStateAction<boolean>;
  payrollState: boolean;

  handlePayrollState: () => React.SetStateAction<boolean>;
  holidayState: boolean;
  handleHolidayState: () => React.SetStateAction<boolean>;
  travelPassState: boolean;
  handleTravelPassState: () => React.SetStateAction<boolean>;
  deductionState: boolean;
  handleDeductionState: () => React.SetStateAction<boolean>;
  leaveState: boolean;
  handleLeaveState: () => React.SetStateAction<boolean>;
};

const NavigationContext = createContext<TNavigationContext | null>(null);

function Navigation() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [overViewState, setOverViewState] = useState(true);
  const [employeeState, setEmployeeState] = useState(true);
  const [dailyTimeRecordState, setDailyTimeRecordState] = useState(true);
  const [payrollState, setPayrollState] = useState(true);
  const [holidayState, setHolidayState] = useState(true);
  const [travelPassState, setTravelPassState] = useState(true);
  const [deductionState, setDeductionState] = useState(true);
  const [leaveState, setLeaveState] = useState(true);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOverViewState = () => {
    setOverViewState(!overViewState);
  };
  const handleEmployeeState = () => {
    setEmployeeState(!employeeState);
  };
  const handleDailyTimeRecordState = () => {
    setDailyTimeRecordState(!dailyTimeRecordState);
  };
  const handlePayrollState = () => {
    setPayrollState(!payrollState);
  };
  const handleHolidayState = () => {
    setHolidayState(!holidayState);
  };
  const handleTravelPassState = () => {
    setTravelPassState(!travelPassState);
  };
  const handleDeductionState = () => {
    setDeductionState(!deductionState);
  };
  const handleLeaveState = () => {
    setLeaveState(!leaveState);
  };

  const value = {
    isMenuOpen,
    handleMenuOpen,
    overViewState,
    handleOverViewState,
    employeeState,
    handleEmployeeState,
    dailyTimeRecordState,
    handleDailyTimeRecordState,
    payrollState,
    handlePayrollState,
    holidayState,
    handleHolidayState,
    travelPassState,
    handleTravelPassState,
    deductionState,
    handleDeductionState,
    leaveState,
    handleLeaveState,
  } as TNavigationContext;
  return (
    <NavigationContext.Provider value={value}>
      <nav
        className={`border-b sticky top-0 z-30 w-full md:flex backdrop-blur-xl backdrop-saturate-150 ${
          theme === "light" ? "bg-muted/60" : "bg-background/60"
        } items-center`}
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

          <div className="hidden md:block">
            <NavAvatar />
          </div>
        </div>
      </nav>
      <div className={`flex flex-col md:flex-row`}>
        <aside
          className="w-full 
 md:top-16  md:-ml-2 md:h-[calc(100vh-4rem)] shrink-0 md:sticky md:block md:w-64 md:pt-0"
        >
          <div className="pl-6 pr-2">
            {/* Always show menu on desktop mode */}
            {/* Desktop Links */}
            <NavLinkLists className="hidden md:block my-8 " />
            {/* For Desktop Avatar*/}
          </div>

          {/* For Mobile Links And Avatar*/}
          {isMenuOpen && (
            <div
              className={`block md:hidden h-full fixed top-[5em] pt-4 w-full z-30 ${
                theme === "light" ? "bg-muted" : "bg-background"
              } `}
            >
              <NavLinkLists className="md:block mb-8 md:px-6 pl-6" />
            </div>
          )}
        </aside>
        <Main>
          <Outlet />
        </Main>
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
